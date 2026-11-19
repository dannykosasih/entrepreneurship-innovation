# DDK Academy — Entrepreneurship & Innovation LMS

Official Learning Management System & Knowledge Hub for the **Entrepreneurship & Innovation** curriculum by **Dharma Korporasi** (Faculty Lead: **Danny Kosasih**).

## Key Features
- **Modern DDK Dashboard**: Dynamic progress tracking, chapter completion metrics, learning streaks, mentor advice, and quick accelerators.
- **15 Interactive Chapters (Ch 00 – Ch 14)**: Full slide deck player with speaker notes, Google Drive slide integration, and DeKa AI prompt templates.
- **Interactive Testbank Assessments**: Auto-graded multiple-choice quizzes across chapters with detailed explanations.
- **Retail Innovation Case Study (Kopi AJIB)**: Empirical New Retail & AI transformation case study with strategic evaluation rubric.
- **4-Quarter Startup Strategy Simulator**: Interactive runway, burn rate, PMF, and capital allocation simulation.
- **Osterwalder Business Model Canvas (BMC) Builder**: 9-Building Block interactive strategy canvas with presets and Markdown export.
- **Knowledge Wiki & Syllabus**: Searchable encyclopedia of entrepreneurship frameworks and academic references.
- **Official DDK Credential**: Printable Certificate of Completion issued by Dharma Korporasi.
- **Bilingual DeKa AI Assistant (ID/EN)**: Floating popup tutor powered by Google Gemini (`Learn a topic`, `Test my idea`, and `Quiz me` modes) backed by a server-side `/api/chat` proxy so the API key is never exposed to the browser.

## Getting Started

```bash
npm install
npm run dev
```

## Production Build & Server

```bash
npm run build
GEMINI_API_KEY="your-key" node server/server.js
```

### AI Assistant Environment Variables
Set these on **Cloud Run** (recommended: via Secret Manager) or **Netlify** (Site settings → Environment variables):
- `GEMINI_API_KEY` *(required)*: Google AI Studio / Gemini API key. Read server-side only by `server/server.js` and `netlify/functions/chat.js`.
- `GEMINI_MODEL` *(optional)*: Gemini model ID, defaults to `gemini-2.5-flash`.

