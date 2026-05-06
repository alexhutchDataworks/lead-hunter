# Lead Hunter — PMM Job Lead Dashboard

A daily job lead dashboard for Product Marketing Manager, Head of Product Marketing, and Director of Product Marketing roles at Seed–Series B startups in the US.

Each lead includes company intel, hiring manager with LinkedIn link, a personalized outreach email, and a Lemlist API payload ready to push into campaigns.

## Quick Deploy to Vercel (2 minutes)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"New Project"** → select your repo
4. Vercel auto-detects Vite — just click **Deploy**
5. Done. You'll get a live URL like `lead-hunter.vercel.app`

## Quick Deploy to Netlify

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Run `npm run build` locally first
3. Drag the `dist/` folder onto the Netlify page
4. Done.

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Updating Leads

Edit `src/leads.js` — each lead object follows this structure:

```js
{
  id: 1,
  company: "Company Name",
  role: "Product Marketing Manager",
  location: "City, State (Remote?)",
  url: "https://link-to-job-posting.com",
  stage: "Seed | Series A | Series B",
  about: "Company description and intel...",
  hiringManager: {
    name: "First Last",
    title: "Title",
    linkedin: "https://linkedin.com/in/handle",
  },
  postedDays: 3,
  salary: "$XXK–$XXK + equity",
  tags: ["Tag1", "Tag2", "Tag3"],
  source: "Y Combinator | Built In | MKT1 | Greenhouse | Startup.jobs",
}
```

## Lemlist Integration

Each lead generates a ready-to-use API payload. To automate:

1. Get your API key: Lemlist → Settings → Integrations → API
2. Create a campaign with custom variables: `{{customVar1}}`, `{{customVar2}}`, `{{customVar3}}`
3. POST leads to `https://api.lemlist.com/api/campaigns/{campaignId}/leads`
4. Use Zapier / Make / n8n to automate the full pipeline

## Project Structure

```
lead-hunter/
├── index.html          # Entry point
├── package.json        # Dependencies
├── vite.config.js      # Vite config
├── README.md           # This file
└── src/
    ├── main.jsx        # React mount
    ├── index.css       # Global styles
    ├── App.jsx         # Main dashboard component
    ├── leads.js        # ← UPDATE THIS with fresh leads
    └── utils.js        # Email & Lemlist payload generators
```

## Sources Scanned

- YC Jobs (ycombinator.com/jobs)
- Built In (builtinnyc.com, builtinsf.com, etc.)
- MKT1 Job Board (jobs.mkt1.co)
- Greenhouse job boards
- Startup.jobs
- Ashby job boards
