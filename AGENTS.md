# AGENTS.md

## Project Overview

-   This is a **fully TypeScript-based project**.
-   The application generates **dynamic web interfaces using JSON as the
    page structure definition**.
-   UI pages are composed from structured data rather than hard‑coded
    layouts.

------------------------------------------------------------------------

## Tooling

-   **Runtime:** Bun
-   **Build tool:** Vite

------------------------------------------------------------------------

## Mandatory Dependencies

The following libraries must be used in this project:

-   React 19
-   Styled Components
-   Framer Motion
-   Zustand
-   React Router

------------------------------------------------------------------------

## Mandatory Dev Dependencies

Development tooling requirements:

-   Linting: Oxlint
-   Formatting: Oxfmt
-   Type checking: TypeScript

------------------------------------------------------------------------

# Project Structure

    src/
      components/
      utils/
      store/
      assets/
      pages/
      context/
      hooks/
      constants/
      data/

### Folder Purpose

**components/** - Reusable UI components shared across multiple pages.

**utils/** - Reusable utility functions used in more than one file.

**store/** - Global state management using Zustand.

**assets/** - Static assets (SVG files only).

**pages/** - Route-level page components mapped directly to URLs.

**context/** - React Context providers.

**hooks/** - Reusable custom React hooks.

**constants/** - Shared constants used across the application.

**data/** - Static JSON configuration or structure files.

------------------------------------------------------------------------

# Coding Rules

## Components

Reusable components must follow this structure:

    SampleComponent/
      index.tsx
      styles.ts
      types.ts

Rules:

-   Each reusable component must have its **own folder named after the
    component**.
-   `index.tsx` contains the main component implementation.
-   `styles.ts` contains all styled-components definitions.
-   `types.ts` contains TypeScript types and interfaces.

------------------------------------------------------------------------

## Typing Rules

Strict typing conventions must be followed.

### Interface

-   Used **only for component props**
-   Must start with `I`

Example:

    interface IMyComponentProps {
      title: string
    }

### Type

-   Used for **all other type definitions**
-   Must start with `T`

Example:

    type TUser = {
      id: string
    }

### Importing Types

Always import types using:

    import type { TUser } from "./types"

------------------------------------------------------------------------

## Styling Rules

-   All styling must exist inside **`styles.ts`**.
-   Styled component names must start with:

```{=html}
<!-- -->
```
    Sc<ComponentName>

Example:

    ScContainer
    ScButton
    ScWrapper

Inline styles are allowed **only when the style values change frequently
at runtime**.

------------------------------------------------------------------------

## Assets Rules

The `assets/` folder allows **only `.svg` files**.

------------------------------------------------------------------------

## Utils Rules

The `utils/` folder must contain **only reusable functions used by
multiple files**.

Single-use helpers should remain in the local module.

------------------------------------------------------------------------

## Hooks Rules

The `hooks/` folder must contain **only reusable custom React hooks used
in multiple places**.

------------------------------------------------------------------------

## Pages Rules

The `pages/` folder represents **URL routes**.

Example:

    pages/about-us/company

URL:

    /about-us/company

### Dynamic Routes

Dynamic routes must use bracket syntax:

    pages/news/[date]/article

Example URL:

    /news/2026-01-01/article

Which corresponds to:

    /news/:date/article

### Allowed Files in Page Folders

Only the following files are allowed:

    index.tsx
    index.ts
    styles.ts
    types.ts

Page files should only:

-   Compose UI components
-   Handle routing logic

Business logic should live in hooks, stores, or utils.

------------------------------------------------------------------------

## Data Rules

The `data/` folder allows **JSON files only**.

------------------------------------------------------------------------

# Application Testing

Before running the development server:

1.  Run linting and type checking.

Recommended commands:

    bun run lint
    bun run type-check

2.  Start the development server.

```{=html}
<!-- -->
```
    bun run dev

3.  Use **Playwright** to access the UI via:

```{=html}
<!-- -->
```
    http://localhost:<PORT>

------------------------------------------------------------------------

# Progress Reporting

While executing tasks you MUST report progress continuously.

After each action:
- explain what you did
- show modified files
- show created files

Never wait until the end of the task to report.

Example reporting format:

[STEP]
Action: create component registry

Files created:
- src/core/componentRegistry.ts

Next step:
create JSON renderer

- report via telegram