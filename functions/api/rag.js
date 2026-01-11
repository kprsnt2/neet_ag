// RAG Search Utilities for NEET Content
// Uses Supabase Vector for similarity search

/**
 * Generate embedding using Gemini API (free)
 */
async function generateEmbedding(text, apiKey) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'models/text-embedding-004',
                content: { parts: [{ text }] }
            })
        }
    );

    if (!response.ok) {
        throw new Error(`Embedding API Error: ${await response.text()}`);
    }

    const data = await response.json();
    return data.embedding.values;
}

/**
 * Search for relevant NCERT content using vector similarity
 */
async function searchNcertContent(query, subject, classLevel, supabaseUrl, supabaseKey, geminiKey) {
    // Generate embedding for the query
    const embedding = await generateEmbedding(query, geminiKey);

    // Search Supabase using the match function
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/match_ncert_content`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({
            query_embedding: embedding,
            subject_filter: subject || null,
            class_filter: classLevel || null,
            match_threshold: 0.6,
            match_count: 5
        })
    });

    if (!response.ok) {
        console.error('Supabase search error:', await response.text());
        return [];
    }

    return await response.json();
}

/**
 * Format retrieved context for injection into prompts
 */
function formatContext(results) {
    if (!results || results.length === 0) {
        return null;
    }

    const contextParts = results.map((r, i) => {
        const source = `NCERT ${r.subject.charAt(0).toUpperCase() + r.subject.slice(1)} Class ${r.class_level}, Chapter ${r.chapter_number}: ${r.chapter_name}`;
        const subtopic = r.subtopic ? ` (${r.subtopic})` : '';
        return `[Source ${i + 1}: ${source}${subtopic}]\n${r.content}`;
    });

    return contextParts.join('\n\n---\n\n');
}

/**
 * Build RAG-enhanced system prompt
 */
function buildRagPrompt(originalPrompt, context, sources) {
    if (!context) {
        return originalPrompt;
    }

    return `${originalPrompt}

---
## NCERT Reference Content (Use this as authoritative source)

The following content is extracted from NCERT textbooks. Use this to provide accurate, NCERT-aligned answers:

${context}

---
IMPORTANT: 
- Base your response on the NCERT content provided above
- Cite sources when making specific claims (e.g., "According to NCERT...")
- If the NCERT content doesn't cover something, clearly state it's additional information`;
}

export { generateEmbedding, searchNcertContent, formatContext, buildRagPrompt };
