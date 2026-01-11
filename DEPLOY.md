# How to Deploy to Cloudflare Pages

Since we've converted the backend to use **Cloudflare Pages Functions**, you can deploy the entire app (frontend + backend) to Cloudflare Pages for free.

## Option 1: Drag and Drop (Easiest)

1.  Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2.  Go to **Workers & Pages** > **Create Application** > **Pages** > **Upload Assets**.
3.  Upload the entire `Neet` folder from your desktop.
4.  Once uploaded, go to the project **Settings** > **Environment Variables**.
5.  Add your API keys:
    *   `CLAUDE_API_KEY`: `sk-ant...`
    *   `GEMINI_API_KEY`: `AIza...`

## Option 2: Using Wrangler CLI

```bash
npx wrangler pages deploy . --project-name neet-study-assistant
```

---

## RAG Setup (Optional but Recommended)

Enable AI responses backed by actual NCERT content:

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Run the SQL in `RAG_SETUP.md` in the SQL Editor

### 2. Add Environment Variables
Add to Cloudflare Pages:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anon/public key

### 3. Ingest Content
```bash
cd scripts
npm install
node ingest.js
```

---

## MCP Server (For IDE Integration)

Use NEET resources directly in Claude Desktop or other MCP-compatible tools:

```bash
cd mcp-server
npm install
npm start
```

Add to Claude Desktop settings:
```json
{
  "mcpServers": {
    "neet": {
      "command": "node",
      "args": ["path/to/mcp-server/index.js"]
    }
  }
}
```

---

## Local Testing

```bash
npx wrangler pages dev .
```

## Notes
- **Do not use** `python backend/main.py` - logic is now in `functions/api/explain.js`
- RAG is optional - app works without Supabase, just without NCERT citations

