# How to Deploy to Cloudflare Pages

Since we've converted the backend to use **Cloudflare Pages Functions**, you don't need a separate Python server. You can deploy the entire app (frontend + backend) to Cloudflare Pages for free.

## Option 1: Drag and Drop (Easiest)

1.  Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2.  Go to **Workers & Pages** > **Create Application** > **Pages** > **Upload Assets**.
3.  Upload the entire `Neet` folder from your desktop (`c:\Users\Prashanth Kumar\Desktop\Neet`).
    *   *Note: Cloudflare will automatically detect the `functions` folder and deploy your API.*
4.  Once uploaded, go to the project **Settings** > **Environment Variables**.
5.  Add your API keys:
    *   `CLAUDE_API_KEY`: `sk-ant...`
    *   `GEMINI_API_KEY`: `AIza...`
6.  Redeploy (or create a new deployment) to apply the variables.

## Option 2: Using Wrangler CLI (Advanced)

If you have Node.js installed, you can deploy from the terminal:

```bash
npx wrangler pages deploy . --project-name neet-study-assistant
```

## Local Testing
To test the "Cloudflare version" locally (optional):
```bash
npx wrangler pages dev .
```

## Important Notes
*   **Do nout use** `python backend/main.py` anymore for deployment. The logic is now in `functions/api/explain.js`.
*   The `index.html` and `app.js` are configured to work automatically on Cloudflare.
