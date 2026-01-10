from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import uvicorn
import os
import json
import httpx
import asyncio

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AIRequest(BaseModel):
    topic: str
    subject: str
    class_level: str
    action_type: str  # explain, eli5, keypoints, mcq, ncert

class AIResponse(BaseModel):
    success: bool
    content: str
    provider: str
    mcqs: Optional[List[Dict[str, Any]]] = None
    error: Optional[str] = None

# System Prompts
def get_system_prompt(action_type: str, subject: str, class_level: str, topic: str):
    subject_display = subject.capitalize()
    class_display = f"Class {class_level}"
    
    if action_type == 'explain':
        return f"""You are an expert NEET exam tutor specializing in {subject_display} for {class_display}. 
Explain the concept "{topic}" clearly and thoroughly. Include:
1. Core definition and concept
2. Important points for NEET exam
3. Common misconceptions to avoid
4. Real-world examples or applications
5. Memory tricks or mnemonics if applicable

Format your response with clear headings (##) and bullet points. Be comprehensive but concise."""

    elif action_type == 'eli5':
        return f"""You are a friendly tutor explaining {subject_display} to a {class_display} student who is struggling.
Explain "{topic}" in the simplest possible terms:
1. Use everyday analogies and examples
2. Avoid jargon - when you must use technical terms, explain them simply
3. Use visual descriptions when helpful
4. Keep it encouraging and relatable
5. End with a simple summary

Make it so simple that anyone could understand, but still accurate for NEET preparation."""

    elif action_type == 'keypoints':
        return f"""You are a NEET exam expert. For "{topic}" in {subject_display} {class_display}:
1. List the TOP 10 most important points for NEET
2. Mark which points are MOST FREQUENTLY asked
3. Include any formulas/reactions that MUST be memorized
4. Mention typical question patterns
5. Add 2-3 quick revision points

Format as a clear, scannable list. This should be perfect for last-minute revision."""

    elif action_type == 'mcq':
        return f"""You are a NEET exam question creator. Create 5 NEET-style MCQs for "{topic}" in {subject_display} {class_display}.

For each question provide:
- The question
- 4 options (A, B, C, D)
- Correct answer index (0-3)
- Brief explanation of why it's correct and why others are wrong

Make questions similar to actual NEET exam difficulty. Include at least one application-based question.

Response MUST be a raw JSON array like this:
[
  {{
    "question": "Question text here...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Explanation here..."
  }}
]
Do not add any markdown formatting or extra text outside the JSON."""

    elif action_type == 'ncert':
        return f"""You are an NCERT textbook expert. For "{topic}" in {subject_display} {class_display}:
1. Specify which NCERT book and chapter covers this topic
2. Mention specific page ranges if possible
3. Highlight which sections are most important for NEET
4. Note any diagrams or tables that are frequently tested
5. Point out any additional topics in the same chapter that are related

Be specific with book names."""

    return f"You are a NEET exam tutor. Help the student with {topic}."

async def call_claude(prompt: str, system_prompt: str, api_key: str):
    headers = {
        'x-api-key': api_key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
    }
    data = {
        "model": "claude-haiku-4-5-20251001",
        "max_tokens": 4096,
        "system": system_prompt,
        "messages": [{"role": "user", "content": prompt}]
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post('https://api.anthropic.com/v1/messages', headers=headers, json=data, timeout=30.0)
        if resp.status_code != 200:
            raise Exception(f"Claude API Error: {resp.text}")
        result = resp.json()
        return result['content'][0]['text']

async def call_gemini(prompt: str, system_prompt: str, api_key: str):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    headers = {'Content-Type': 'application/json'}
    data = {
        "contents": [{
            "parts": [{"text": f"{system_prompt}\n\nTask: {prompt}"}]
        }],
        "generationConfig": {
            "maxOutputTokens": 4096,
            "temperature": 0.1
        }
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, headers=headers, json=data, timeout=30.0)
        if resp.status_code != 200:
            raise Exception(f"Gemini API Error: {resp.text}")
        result = resp.json()
        try:
            return result['candidates'][0]['content']['parts'][0]['text']
        except:
            if 'promptFeedback' in result:
                raise Exception(f"Gemini filtered response: {result['promptFeedback']}")
            raise Exception("Invalid response from Gemini")

@app.post("/api/explain", response_model=AIResponse)
async def explain_topic(req: AIRequest):
    # Get keys from environment variables
    claude_key = os.environ.get("CLAUDE_API_KEY")
    gemini_key = os.environ.get("GEMINI_API_KEY")

    if not claude_key and not gemini_key:
        raise HTTPException(status_code=500, detail="Server misconfiguration: No API keys found in environment variables")

    system_prompt = get_system_prompt(req.action_type, req.subject, req.class_level, req.topic)
    user_prompt = f"Topic: {req.topic}"

    # Try Claude first
    if claude_key:
        try:
            content = await call_claude(user_prompt, system_prompt, claude_key)
            
            # Handle MCQ parsing
            mcqs = None
            if req.action_type == 'mcq':
                try:
                    # Clean up json string if needed
                    json_str = content.strip()
                    if json_str.startswith('```json'):
                        json_str = json_str[7:-3]
                    elif json_str.startswith('```'):
                        json_str = json_str[3:-3]
                    mcqs = json.loads(json_str)
                except:
                    pass
            
            return AIResponse(success=True, content=content, provider="claude", mcqs=mcqs)
        except Exception as e:
            print(f"Claude failed: {e}")
            if not gemini_key:
                return AIResponse(success=False, content="", provider="claude", error=str(e))

    # Fallback to Gemini
    if gemini_key:
        try:
            content = await call_gemini(user_prompt, system_prompt, gemini_key)
            
            mcqs = None
            if req.action_type == 'mcq':
                try:
                    json_str = content.strip()
                    if json_str.startswith('```json'):
                        json_str = json_str[7:-3]
                    elif json_str.startswith('```'):
                        json_str = json_str[3:-3]
                    mcqs = json.loads(json_str)
                except:
                    pass

            return AIResponse(success=True, content=content, provider="gemini", mcqs=mcqs)
        except Exception as e:
            return AIResponse(success=False, content="", provider="gemini", error=str(e))

    return AIResponse(success=False, content="", provider="none", error="All providers failed")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
