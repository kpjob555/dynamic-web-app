 # TASKS.md

## Task 1 --- Create the Main Framework

### JSON Structure

The framework must support the following JSON schema:

    {
      "id": "{UUID}",
      "name": "",
      "configuration": {
        "component": "",
        "children": [
          {
            "component": "",
            "children": [],
            "props": {},
            "styles": {}
          }
        ],
        "props": {},
        "styles": {}
      }
    }

### Framework Behavior

The application must:

-   Read JSON configuration files from the `data/` folder
-   Convert the JSON structure into a React component tree
-   Render the page dynamically based on the JSON configuration

------------------------------------------------------------------------

# Task 2 --- Create Application Pages

The framework must include two main pages.

------------------------------------------------------------------------

## `/configuration`

Purpose: manage JSON configurations.

Features:

-   Display list of JSON configuration files from the `data/` folder
-   If no JSON files exist, show a page with a button:

```{=html}
<!-- -->
```
    Add new configuration

### UI Requirements

Each configuration item must include:

-   `Edit` button
-   `Delete` button

### JSON Editor

When clicking **Add** or **Edit**:

Open a JSON editor form that allows editing the JSON structure.

Editor actions:

**Save**

-   Creates a new JSON file inside the `data/` folder

**Update**

-   Updates the existing JSON file

------------------------------------------------------------------------

## `/views`

Purpose: render JSON configurations.

Features:

-   Display a list of available JSON configurations
-   User can select one configuration to render
-   Only **one configuration may be displayed at a time**

Behavior:

-   When a configuration is selected, the framework builds the page
    dynamically based on its JSON structure.

------------------------------------------------------------------------

# Task 3 --- Create Core Components

Create reusable UI components.

------------------------------------------------------------------------

## Layout Components

    Header
    Footer
    Body
    Sidebar

------------------------------------------------------------------------

## Form Components

### Fields

    TextField
    NumberField

### Dropdown

    SingleDropdown
    MultiSelectDropdown

### Other Inputs

    Radio

### Buttons

    SubmitButton
    CancelButton

------------------------------------------------------------------------

## UI Components

    Table
    Modal
    Tooltip

------------------------------------------------------------------------

## Label Components

    HeaderLabel    font-size: 18px
    ContentLabel   font-size: 14px

------------------------------------------------------------------------

## Tooltip

    font-size: 12px

------------------------------------------------------------------------

## Layout Utilities

    Rows
    Columns

------------------------------------------------------------------------

## Navigation

    Route

Used for dynamic navigation between pages.

------------------------------------------------------------------------

# Implementation Notes

The framework must support:

-   dynamic component rendering
-   nested component structures
-   passing props from JSON
-   applying styles from JSON
-   recursive rendering of `children`

------------------------------------------------------------------------

# Task 4 --- Create Component Registry

Create a component registry system that maps JSON component names to
React components.

Example:

    {
      Header,
      Footer,
      TextField,
      Table
    }

The JSON renderer will map:

    "component": "TextField"

to the corresponding React component.
