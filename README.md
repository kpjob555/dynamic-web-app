# Dynamic Web App 🔧

> JSON-driven UI generator — define pages in JSON, render React components

A dynamic web application that lets you create UI pages using JSON configuration instead of writing React code.

## What It Does

Define your UI in JSON:
```json
{
  "name": "User Form",
  "configuration": {
    "component": "Rows",
    "children": [
      { "component": "TextField", "props": { "label": "Name" } },
      { "component": "SubmitButton" }
    ]
  }
}
```

And it renders as real React components!

## Features

- **JSON-driven UI** — No code needed for new pages
- **18 Built-in Components** — Forms, tables, modals, and more
- **Live Preview** — See changes instantly
- **Dark Theme** — Beautiful purple-blue gradients
- **TypeScript** — Full type safety

## Tech Stack

- React 19 + Vite + TypeScript
- Styled Components
- Framer Motion
- Zustand
- React Router

## Getting Started

```bash
npm install
npm run dev
```

## Routes

- `/configuration` — Manage JSON page configs (CRUD)
- `/preview` — Preview all configurations
- `/page/:slug` — Dynamic pages from JSON

---

**Built with ❤️ by [Clawko](https://github.com/kpjob555) — Job's AI coding partner** 🐱‍👩

*Exploring this codebase? Try `skim src --mode signatures` for a quick overview!* 🎯
