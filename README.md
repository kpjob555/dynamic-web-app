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

## 📦 Available Components

### Layout Components
| Component | Description |
|-----------|-------------|
| `Body` | Main content container |
| `Header` | Top navigation bar |
| `Footer` | Bottom footer section |
| `Sidebar` | Side navigation panel |
| `Rows` | Vertical stack container (children arranged vertically) |
| `Columns` | Horizontal arrangement container |

### Form Components
| Component | Props | Description |
|-----------|-------|-------------|
| `TextField` | `label`, `value`, `onChange`, `placeholder` | Text input field |
| `NumberField` | `label`, `value`, `onChange`, `placeholder` | Numeric input field |
| `SingleDropdown` | `label`, `options`, `value`, `onChange` | Single selection dropdown |
| `MultiSelectDropdown` | `label`, `options`, `value`, `onChange` | Multi-select dropdown |
| `Radio` | `label`, `options`, `value`, `onChange` | Radio button group |
| `SubmitButton` | `onClick`, `disabled`, `style` | Submit action button |
| `CancelButton` | `onClick`, `style` | Cancel action button |

### UI Components
| Component | Props | Description |
|-----------|-------|-------------|
| `Table` | `columns`, `data`, `renderCell` | Data table with custom cell rendering |
| `Modal` | `isOpen`, `onClose`, `title` | Popup modal dialog |
| `Tooltip` | `text`, `children` | Hover tooltip |

### Label Components
| Component | Description |
|-----------|-------------|
| `HeaderLabel` | Large heading text (18px) |
| `ContentLabel` | Regular content text (14px) |

### Navigation
| Component | Props | Description |
|-----------|-------|-------------|
| `Route` | `to`, `children` | Link navigation |

---

## 🔧 JSON Configuration Structure

Each configuration is a JSON object with this structure:

```json
{
  "id": "uuid-string",
  "name": "Page Name",
  "configuration": {
    "component": "Body",
    "children": [
      {
        "component": "Rows",
        "props": {},
        "children": [
          {
            "component": "TextField",
            "props": {
              "label": "Your Name"
            }
          },
          {
            "component": "SubmitButton",
            "props": {
              "onClick": "handleSubmit"
            }
          }
        ]
      }
    ],
    "props": {},
    "styles": {}
  }
}
```

### Configuration Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier (UUID) |
| `name` | string | Display name of the configuration |
| `configuration` | object | Root component configuration |
| `configuration.component` | string | Component name (e.g., "Body", "Rows") |
| `configuration.children` | array | Child components array |
| `configuration.props` | object | Component properties |
| `configuration.styles` | object | Custom inline styles |

### Component Reference

Each component in `children` accepts:
- `component`: Component name (required)
- `props`: Object with component-specific properties
- `children`: Nested child components (optional)
- `styles`: Custom styles object (optional)

---

## 📝 Example Configurations

### Simple Form
```json
{
  "id": "form-1",
  "name": "Contact Form",
  "configuration": {
    "component": "Body",
    "children": [
      {
        "component": "Rows",
        "children": [
          { "component": "HeaderLabel", "props": { "children": "Contact Us" } },
          { "component": "TextField", "props": { "label": "Name" } },
          { "component": "TextField", "props": { "label": "Email" } },
          { "component": "SubmitButton", "props": { "children": "Send" } }
        ]
      }
    ]
  }
}
```

### Data Table
```json
{
  "id": "table-1",
  "name": "Users Table",
  "configuration": {
    "component": "Body",
    "children": [
      {
        "component": "Table",
        "props": {
          "columns": [
            { "key": "name", "header": "Name" },
            { "key": "email", "header": "Email" }
          ],
          "data": [
            { "name": "John", "email": "john@example.com" },
            { "name": "Jane", "email": "jane@example.com" }
          ]
        }
      }
    ]
  }
}
```

### Dropdown Selection
```json
{
  "id": "dropdown-1",
  "name": "Country Select",
  "configuration": {
    "component": "Body",
    "children": [
      {
        "component": "SingleDropdown",
        "props": {
          "label": "Select Country",
          "options": [
            { "value": "th", "label": "Thailand" },
            { "value": "us", "label": "United States" },
            { "value": "uk", "label": "United Kingdom" }
          ]
        }
      }
    ]
  }
}
```

---

## 🚀 Using the Configuration Editor

1. Navigate to `/configuration`
2. Click **Add New Configuration** or **Edit** an existing one
3. Use the **JSON Editor** to write your configuration:
   - Syntax highlighting for JSON
   - **Format JSON** button to auto-format
   - Auto-completion for JSON structure
4. Click **Save** to create or **Update** to save changes
5. View your page at `/page/:slug`

---

**Built with ❦️ by [Clawko](https://github.com/kpjob555) — Job's AI coding partner** 🐱👩

*Exploring this codebase? Try `skim src --mode signatures` for a quick overview!* 🎯
