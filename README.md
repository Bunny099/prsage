<div align="center">

# 🤖 PRsage

**PRsage reviews pull requests, surfaces real issues, and delivers clear, structured feedback directly on your code.**

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Gemini](https://img.shields.io/badge/Gemini_API-8E75B2?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)

[📦 Marketplace](https://github.com/marketplace/prsage) · [🔗 Repository](https://github.com/Bunny099/prsage) · [🌐 Live Service](https://prsage.onrender.com)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔁 **Automated PR Reviews** | Triggers automatically on pull request open and update events |
| 🔍 **Meaningful Analysis** | Highlights bugs, security concerns, performance issues, and code quality problems |
| 📋 **Structured Feedback** | Every review includes a clear Summary, Issues, and Suggestions section |
| 📊 **Iteration Tracking** | Tracks changes across commits — shows what was fixed and what still remains |
| 🗄️ **Persistent History** | Maintains full review context in a database throughout the PR lifecycle |

---

## 🧠 How It Works
```
PR Opened / Updated
        │
        ▼
  Fetch Changed Files & Patches
        │
        ▼
  Generate Structured AI Review
        │
        ├── First Review? ──► Post Initial Review Comment
        │
        └── Update? ──► Compare with Previous Context ──► Post Updated Feedback
```

1. A pull request is **opened or updated**
2. PRsage **fetches changed files** and their patches
3. **Generates a structured review** based on the diff
4. On subsequent updates, **compares against previous review context**
5. **Posts a new comment** with updated, iteration-aware feedback

---

## 🧪 Example Review Output
```
🤖 PRsage AI Review
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 Summary
 Adds authentication flow but lacks proper input validation.

 Issues
  • Missing validation for environment variables
  • Incomplete error handling in API calls

 Suggestions
  • Add validation checks before consuming env variables
  • Centralize API error handling logic for consistency
```

---

## 🛠️ Tech Stack

- **Backend** — TypeScript, Express
- **GitHub Integration** — GitHub App via Octokit
- **Database** — PostgreSQL with Prisma ORM
- **AI Engine** — Google Gemini API

---

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Bunny099/prsage.git
cd prsage
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):
```env
APP_ID=
CLIENT_ID=
GEMINI_API=
WEBHOOK_SEC=
NODE_ENV=development
SMEE_URL=
DATABASE_URL=
PORT=3000
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
```

> **Tip:** You'll need a registered GitHub App to populate `APP_ID`, `CLIENT_ID`, `WEBHOOK_SEC`, and `PRIVATE_KEY`. Use [Smee.io](https://smee.io) to forward webhooks locally during development.

### 4. Start the Development Server
```bash
pnpm dev
```

---

## 🔗 Links

- 📦 **GitHub Marketplace** — [github.com/marketplace/prsage](https://github.com/marketplace/prsage)
- 💻 **Repository** — [github.com/Bunny099/prsage](https://github.com/Bunny099/prsage)
- 🌐 **Live Service** — [prsage.onrender.com](https://prsage.onrender.com)

---

## 👨‍💻 About

Built as a personal project to explore:

- Pull request automation workflows
- GitHub App architecture and Octokit integration
- Practical backend system design with AI APIs

---

## ⭐ Support

If you find PRsage useful:

- Give it a **star ⭐** on GitHub
- **Open an issue** for feedback, bugs, or feature requests

---

<div align="center">
  <sub>Made with ❤️ by <a href="https://github.com/Bunny099">Bunny099</a></sub>
</div>