# SYN9

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


A multifunctional starter template for creating desktop applications using **Tauri 2.0**, **SolidJS**, **Tailwind CSS v4**, **Solid-DND**, **VS Code Codicons** and **DaisyUI**.

SYN9 provides a pre-configured framework with common user interface templates and utilities to speed up development on Tauri.

Created for the development and research of [AI-Context-DSL](https://github.com/sdfgfdsrfvcgtrc/AI-Context-DSL). YAML-based DSL for AI-powered development: annotations, context binding, and code generation.

## 🚀 Features

Out of the box, SYN9 includes:

*   **Tauri 2.0**: Build secure, fast desktop apps.
*   **SolidJS**: High-performance, reactive JavaScript library.
*   **Tailwind CSS v4 (CSS-First)**: Utility-first CSS framework.
*   **DaisyUI**: Beautiful UI components for Tailwind CSS.
*   **VS Code Codicons**: Integrated icon set.
*   **Drag & Drop**: Implemented with `@thisbeyond/solid-dnd`.
*   **Resizable Panels**: Custom resizable UI components.
*   **Dynamic Tabs**:
    *   Add, close, and reorder tabs.
    *   Scrollable tab bar with arrow buttons.
*   **Theme System**:
    *   Easily switchable themes (e.g., `lightsyn9`, `darksyn9`).
    *   Centralized theme definitions (`src/themes/`).
*   **Internationalization (i18n)**:
    *   Multi-language support.
    *   Centralized translations (`src/locales/`).
*   **Modular UI Components**:
    *   Clean separation of concerns (`src/components/ui/`).
    *   Includes `Header`, `ActivityBar`, `Sidebar`, `StatusBar`.
*   **Internal Keyboard Shortcuts**:
    *   Basic framework for handling app-specific shortcuts (`src/shortcuts/`).
    *   Example: `Ctrl+Shift+L` for a test alert.
*   **Structured Example Sections**:
    *   Demonstrations of integrated features within the app UI.

## 📦 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (and npm/pnpm/yarn)
*   [Rust](https://www.rust-lang.org/) (Tauri requirement)
*   [Tauri CLI](https://v2.tauri.app/start/prerequisites/) (Usually installed automatically, but check platform-specific requirements)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/syn9.git
    cd syn9
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # pnpm install
    # yarn install
    ```
3.  **Run the development server:**
    ```bash
    npm run tauri dev
    # or using the custom script
    # npm run syn9
    ```

This will launch the Tauri development application.

### Building

To build the application for production:

```bash
npm run tauri build

🛠️ Project Structure
syn9/
├── src/
│   ├── components/
│   │   ├── examples/       # Demo components showcasing features
│   │   ├── tabs/           # Tab related components (SortableTab, TabPanel)
│   │   └── ui/             # Core UI layout components (Header, Sidebar, etc.)
│   ├── locales/            # Language translation files (JSON) and index
│   ├── themes/             # Theme definition files (CSS variables) and index
│   ├── shortcuts/          # Internal keyboard shortcut handling logic
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global styles and Tailwind imports
│   ├── index.tsx           # Entry point
│   └── i18n.ts             # Internationalization logic
├── src-tauri/              # Tauri backend (Rust)
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
└── README.md               # This file
```
## Technologies Used

*   [Tauri](https://tauri.app/)
*   [SolidJS](https://www.solidjs.com/)
*   [Tailwind CSS v4](https://tailwindcss.com/)
*   [DaisyUI](https://daisyui.com/)
*   [VS Code Codicons](https://github.com/microsoft/vscode-codicons)
*   [@thisbeyond/solid-dnd](https://github.com/thisbeyond/solid-dnd)

## Customization

SYN9 is designed to be easily customizable:

*   **Adding a New Theme**:
    1.  Create `src/themes/yourtheme.css` with CSS variables.
    2.  Register it in `src/themes/index.ts` (`AVAILABLE_THEMES` array).
*   **Adding a New Language**:
    1.  Create `src/locales/[lang_code].json` with translations.
    2.  Register it in `src/locales/index.ts` (`AVAILABLE_LANGUAGES` array).
*   **Adding New Sections/Features**:
    1.  Add a new component in `src/components/examples/`.
    2.  Add a route/handler in `TabPanel.tsx` (within the `Switch`).
    3.  Add a navigation item in `Sidebar.tsx`.
*   **Adding Internal Shortcuts**:
    1.  Modify `src/shortcuts/index.ts` to define the new shortcut and its handler function.
    2.  Pass the handler function via `shortcutHandlers` in `App.tsx`.
