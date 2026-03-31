# Pheron (formerly AgentFlow)

Pheron is a platform to **centralize and orchestrate coding agents** in one place, with a focus on productivity and operational control.

This repository contains the public Pheron website (landing page + download flow), including a backend endpoint to fetch the latest installable release.

## Problem it solves

In many teams, development agents (Claude Code, Gemini, custom runners, etc.) are spread across scripts, prompts, and disconnected tools. This creates:

- Fragmented workflows.
- Low traceability from issue -> execution -> PR.
- Poor visibility and control over token spending.
- Operational overhead to coordinate multiple agents.

Pheron addresses this as a **command center**: it unifies agents, repositories, and task execution with clear cost visibility.

## Core product capabilities

- GitHub integration for repositories, issues, and pull requests.
- Issue automation: assign tasks to agents and open PRs automatically.
- Multi-runner support (Claude Code, Gemini, and custom runners).
- Specialist agent catalog (frontend, backend, QA, code review).
- Custom agent builder with your own prompts and tools.
- Token and cost control per project, agent, and time period.
- Cost alerts and usage reporting to avoid budget overruns.

## Repository architecture

Main stack:

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS

Key technical pieces:

- Product landing sections in `src/components/*`.
- `GET /api/release` endpoint in `src/app/api/release/route.ts`:
  - Fetches the latest release from GitHub.
  - Returns version and architecture-specific download URLs (`arm64` and `x64`).
  - Supports optional `GITHUB_TOKEN` to reduce rate-limit issues.
- `install.sh` installer for macOS:
  - Detects machine architecture.
  - Downloads the correct DMG from GitHub Releases.
  - Installs the app into `/Applications`.

## Run locally

Requirements:

- Node.js 18+
- npm

Steps:

```bash
npm install
npm run dev
```

Local app:

- `http://localhost:3000`

Production build:

```bash
npm run build
npm run start
```

## Environment variables

- `GITHUB_TOKEN` (optional): token used to authenticate GitHub API requests in `/api/release`.

## Brand rename

This project started as **AgentFlow** and now evolves under the **Pheron** name.

During the transition, historical references may still exist in folder/repository names, but the current product name and direction are **Pheron**.

## Coming next

- **Telegram integration**: chat with Claude, Gemini, or Codex directly from your phone. Assign issues, review PRs, and check token usage from Telegram without opening the desktop app.
- **Context optimization**: automatic context window management per agent — trim, summarize, and prioritize relevant history to reduce token usage and improve response quality across long-running tasks.

## Why it matters

Pheron helps teams scale coding-agent usage without losing control:

- Faster delivery through task automation.
- Less operational friction with a single coordination point.
- Better technical governance with full issue/PR traceability.
- Real cost control through limits, alerts, and usage metrics.
