export async function onRequestPost({ request, env }) {
    try {
        const req = await request.json();
        const { topic, subject, class_level, action_type } = req;

        // Get keys from environment variables
        const claude_key = env.CLAUDE_API_KEY;
        const gemini_key = env.GEMINI_API_KEY;

        if (!claude_key && !gemini_key) {
            return new Response(JSON.stringify({
                success: false,
                error: "Server misconfiguration: No API keys found in environment variables"
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        const system_prompt = getSystemPrompt(action_type, subject, class_level, topic);
        const user_prompt = `Topic: ${topic}`;

        // Try Claude first
        if (claude_key) {
            try {
                const content = await callClaude(user_prompt, system_prompt, claude_key);
                let mcqs = null;

                if (action_type === 'mcq') {
                    try {
                        let json_str = content.trim();
                        if (json_str.startsWith('```json')) json_str = json_str.slice(7, -3);
                        else if (json_str.startsWith('```')) json_str = json_str.slice(3, -3);
                        mcqs = JSON.parse(json_str);
                    } catch (e) { /* ignore parse error */ }
                }

                return new Response(JSON.stringify({ success: true, content, provider: "claude", mcqs }), {
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

                if (action_type === 'mcq') {
                    try {
                        let json_str = content.trim();
                        if (json_str.startsWith('```json')) json_str = json_str.slice(7, -3);
                        else if (json_str.startsWith('```')) json_str = json_str.slice(3, -3);
                        mcqs = JSON.parse(json_str);
                    } catch (e) { /* ignore parse error */ }
                }

                return new Response(JSON.stringify({ success: true, content, provider: "gemini", mcqs }), {
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
            max_tokens: 2048,
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
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: `${systemPrompt}\n\nTask: ${prompt}` }]
            }],
            generationConfig: {
                maxOutputTokens: 2048,
                temperature: 0.7
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

function getSystemPrompt(action_type, subject, class_level, topic) {
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
1. Use everyday analogies and examples
2. Avoid jargon - when you must use technical terms, explain them simply
3. Use visual descriptions when helpful
4. Keep it encouraging and relatable
5. End with a simple summary

Make it so simple that anyone could understand, but still accurate for NEET preparation.`;
    }

    if (action_type === 'keypoints') {
        return `You are a NEET exam expert. For "${topic}" in ${subject_display} ${class_display}:
1. List the TOP 10 most important points for NEET
2. Mark which points are MOST FREQUENTLY asked
3. Include any formulas/reactions that MUST be memorized
4. Mention typical question patterns
5. Add 2-3 quick revision points

Format as a clear, scannable list. This should be perfect for last-minute revision.`;
    }

    if (action_type === 'mcq') {
        return `You are a NEET exam question creator. Create 5 NEET-style MCQs for "${topic}" in ${subject_display} ${class_display}.

For each question provide:
- The question
- 4 options (A, B, C, D)
- Correct answer index (0-3)
- Brief explanation of why it's correct and why others are wrong

Make questions similar to actual NEET exam difficulty. Include at least one application-based question.

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

    if (action_type === 'ncert') {
        return `You are an NCERT textbook expert. For "${topic}" in ${subject_display} ${class_display}:
1. Specify which NCERT book and chapter covers this topic
2. Mention specific page ranges if possible
3. Highlight which sections are most important for NEET
4. Note any diagrams or tables that are frequently tested
5. Point out any additional topics in the same chapter that are related

Be specific with book names.`;
    }

    return `You are a NEET exam tutor. Help the student with ${topic}.`;
}
