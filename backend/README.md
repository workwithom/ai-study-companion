## AI Study Companion – Backend

### Features
- User authentication with HTTP-only cookies
- AI-powered study assistant (Groq LLM)
- Prompt modes: explain, exam, revision, interview, summary
- Persistent study sessions per user
- Session history, detail view, delete
- Per-user daily AI rate limiting
- Real-time quota visibility

### Tech Stack
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- Groq LLM (OpenAI-compatible API)
- JWT Authentication
- Cookie-based sessions

### Run Backend
```bash
cd backend
npm install
npm run dev
