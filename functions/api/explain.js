import { searchNcertContent, formatContext, buildRagPrompt } from './rag.js';

export async function onRequestPost({ request, env }) {
    try {
        const req = await request.json();
        const { topic, subject, class_level, action_type, subtopic, question_type } = req;

        // Get keys from environment variables
        const claude_key = env.CLAUDE_API_KEY;
        const gemini_key = env.GEMINI_API_KEY;
        const supabase_url = env.SUPABASE_URL;
        const supabase_key = env.SUPABASE_ANON_KEY;

        if (!claude_key && !gemini_key) {
            return new Response(JSON.stringify({
                success: false,
                error: "Server misconfiguration: No API keys found in environment variables"
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        // RAG: Retrieve relevant NCERT context if Supabase is configured
        let ragContext = null;
        let sources = [];

        if (supabase_url && supabase_key && gemini_key) {
            try {
                const searchQuery = subtopic ? `${topic} ${subtopic}` : topic;
                const results = await searchNcertContent(
                    searchQuery,
                    subject,
                    class_level,
                    supabase_url,
                    supabase_key,
                    gemini_key
                );

                if (results && results.length > 0) {
                    ragContext = formatContext(results);
                    sources = results.map(r => ({
                        chapter: r.chapter_name,
                        subject: r.subject,
                        classLevel: r.class_level
                    }));
                }
            } catch (ragError) {
                console.error('RAG search error:', ragError);
                // Continue without RAG if it fails
            }
        }

        let system_prompt = getSystemPrompt(action_type, subject, class_level, topic, question_type);

        // Inject RAG context if available
        if (ragContext && action_type !== 'mcq') {
            system_prompt = buildRagPrompt(system_prompt, ragContext, sources);
        }

        const user_prompt = `Topic: ${topic}${subtopic ? ` - Subtopic: ${subtopic}` : ''}`;

        // Try Claude first
        if (claude_key) {
            try {
                const content = await callClaude(user_prompt, system_prompt, claude_key);
                let mcqs = null;
                let questions = null;

                if (action_type === 'mcq' || action_type === 'statement-questions') {
                    try {
                        let json_str = content.trim();
                        if (json_str.startsWith('```json')) json_str = json_str.slice(7, -3);
                        else if (json_str.startsWith('```')) json_str = json_str.slice(3, -3);
                        const parsed = JSON.parse(json_str);
                        if (action_type === 'mcq') mcqs = parsed;
                        else questions = parsed;
                    } catch (e) { /* ignore parse error */ }
                }

                return new Response(JSON.stringify({
                    success: true,
                    content,
                    provider: "claude",
                    mcqs,
                    questions,
                    sources: sources.length > 0 ? sources : undefined
                }), {
                    headers: { "Content-Type": "application/json" }
                });
            } catch (e) {
                if (!gemini_key) throw e;
            }
        }

        // Fallback to Gemini
        if (gemini_key) {
            try {
                const content = await callGemini(user_prompt, system_prompt, gemini_key);
                let mcqs = null;
                let questions = null;

                if (action_type === 'mcq' || action_type === 'statement-questions') {
                    try {
                        let json_str = content.trim();
                        if (json_str.startsWith('```json')) json_str = json_str.slice(7, -3);
                        else if (json_str.startsWith('```')) json_str = json_str.slice(3, -3);
                        const parsed = JSON.parse(json_str);
                        if (action_type === 'mcq') mcqs = parsed;
                        else questions = parsed;
                    } catch (e) { /* ignore parse error */ }
                }

                return new Response(JSON.stringify({
                    success: true,
                    content,
                    provider: "gemini",
                    mcqs,
                    questions,
                    sources: sources.length > 0 ? sources : undefined
                }), {
                    headers: { "Content-Type": "application/json" }
                });
            } catch (e) {
                return new Response(JSON.stringify({ success: false, error: e.toString(), provider: "gemini" }), {
                    headers: { "Content-Type": "application/json" }
                });
            }
        }

        throw new Error("All providers failed");

    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.toString() }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

async function callClaude(prompt, systemPrompt, apiKey) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            model: "claude-3-5-haiku-20241022",
            max_tokens: 3000,
            system: systemPrompt,
            messages: [{ role: "user", content: prompt }]
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Claude API Error: ${err}`);
    }

    const data = await response.json();
    return data.content[0].text;
}

async function callGemini(prompt, systemPrompt, apiKey) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: `${systemPrompt}\n\nTask: ${prompt}` }]
            }],
            generationConfig: {
                maxOutputTokens: 4096,
                temperature: 0.2
            }
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Gemini API Error: ${err}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

function getSystemPrompt(action_type, subject, class_level, topic, question_type = 'statement') {
    const subject_display = subject.charAt(0).toUpperCase() + subject.slice(1);
    const class_display = `Class ${class_level}`;

    if (action_type === 'explain') {
        return `You are an expert NEET exam tutor specializing in ${subject_display} for ${class_display}. 
Explain the concept "${topic}" clearly and thoroughly. Include:
1. Core definition and concept
2. Important points for NEET exam
3. Common misconceptions to avoid
4. Real-world examples or applications
5. Memory tricks or mnemonics if applicable

Format your response with clear headings (##) and bullet points. Be comprehensive but concise.`;
    }

    if (action_type === 'eli5') {
        return `You are a friendly tutor explaining ${subject_display} to a ${class_display} student who is struggling.
Explain "${topic}" in the simplest possible terms:
1. Use everyday analogies and examples a teenager can relate to
2. Avoid jargon - when you must use technical terms, explain them simply
3. Use visual descriptions when helpful
4. Keep it encouraging and relatable
5. End with a simple summary in 2-3 lines

Make it so simple that anyone could understand, but still accurate for NEET preparation.`;
    }

    if (action_type === 'keypoints') {
        return `You are a NEET exam expert. For "${topic}" in ${subject_display} ${class_display}:
1. List the TOP 10 most important points for NEET
2. Mark which points are MOST FREQUENTLY asked (add ⭐ for frequently asked)
3. Include any formulas/reactions that MUST be memorized
4. Mention typical question patterns
5. Add 2-3 quick revision points
6. Include common traps/mistakes students make

Format as a clear, numbered list. This should be perfect for last-minute revision.`;
    }

    if (action_type === 'mcq') {
        return `You are a NEET exam question creator. Create 5 NEET-style MCQs for "${topic}" in ${subject_display} ${class_display}.

For each question provide:
- The question (similar to actual NEET difficulty)
- 4 options (A, B, C, D)
- Correct answer index (0-3)
- Brief explanation of why it's correct and why others are wrong

Include at least one application-based question and one conceptual question.

Response MUST be a raw JSON array like this:
[
  {
    "question": "Question text here...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Explanation here..."
  }
]
Do not add any markdown formatting or extra text outside the JSON.`;
    }

    if (action_type === 'statement-questions') {
        const questionFormat = question_type === 'assertion'
            ? 'Assertion-Reason'
            : 'Statement-based';

        const optionsFormat = question_type === 'assertion'
            ? `[
    "Both (A) and (R) are true and (R) is the correct explanation of (A)",
    "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
    "(A) is true but (R) is false",
    "(A) is false but (R) is true"
  ]`
            : `[
    "Both statements are correct",
    "Only statement I is correct",
    "Only statement II is correct",
    "Both statements are incorrect"
  ]`;

        const statementsFormat = question_type === 'assertion'
            ? `[{"label": "Assertion (A)", "text": "..."}, {"label": "Reason (R)", "text": "..."}]`
            : `[{"label": "I", "text": "..."}, {"label": "II", "text": "..."}]`;

        return `You are a NEET exam question creator specializing in ${questionFormat} questions.

Create 5 ${questionFormat} questions for "${topic}" in ${subject_display} ${class_display}.

For each question:
1. Create statements that test conceptual understanding
2. Make some statements obviously true/false and others subtle
3. Include common misconceptions students might have
4. Base questions on NCERT content
5. Provide clear explanations

Response MUST be a raw JSON array:
[
  {
    "type": "${question_type}",
    "text": "${question_type === 'assertion' ? 'Given below are two statements:' : 'Consider the following statements:'}",
    "statements": ${statementsFormat},
    "options": ${optionsFormat},
    "correct": 0,
    "explanation": "Explanation of why this is correct, referencing NCERT...",
    "ncertRef": "${subject_display} ${class_display} - Chapter X: Chapter Name"
  }
]

Ensure:
- Statements are factually accurate based on NCERT
- Mix of easy and challenging questions
- Clear, educational explanations
- No markdown, just raw JSON`;
    }

    if (action_type === 'ncert') {
        return `You are an NCERT textbook expert. For "${topic}" in ${subject_display} ${class_display}:
1. Specify which NCERT book and exact chapter covers this topic
2. Mention specific page ranges if possible (based on standard NCERT editions)
3. Highlight which sections are most important for NEET
4. Note any diagrams, tables, or figures that are frequently tested
5. Point out any additional topics in the same chapter that are related
6. Mention if this topic also appears in other chapters

Be specific with book names (e.g., "Biology Class 12, Chapter 5: Principles of Inheritance and Variation").`;
    }

    if (action_type === 'visual') {
        return `You are an expert at explaining ${subject_display} concepts visually. For "${topic}" in ${class_display}:

Create a clear visual representation using ONE of these formats (choose the most appropriate):

1. **ASCII Diagram** - For structures, cycles, or processes
2. **Flowchart** - For sequential processes (use arrows →, ↓)
3. **Comparison Table** - For comparing concepts
4. **Mind Map** - For related concepts (use indentation and symbols)

Guidelines:
- Use clear labels
- Show relationships with arrows
- Include key terms
- Add brief explanations below the visual
- Make it easy to memorize

After the visual, add:
- 3 key points to remember
- One memory trick or mnemonic if applicable`;
    }

    // Default for custom queries
    return `You are a NEET exam tutor specializing in ${subject_display} for ${class_display}. 
Help the student understand the topic: ${topic}

Guidelines:
- Be accurate and comprehensive
- Use simple language
- Include relevant examples
- Relate to NEET exam requirements
- Use bullet points and headings for clarity
- If the question mentions Telugu, respond in Telugu (తెలుగు)
- If they ask for mnemonics, be creative but accurate`;
}
