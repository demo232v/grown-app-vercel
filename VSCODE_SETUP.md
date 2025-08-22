# VS Code Setup and Development Guide

## How to Connect VS Code

Follow these steps to properly set up VS Code for development with this repository:

### 1. Prerequisites

Ensure you have the following installed:
- **VS Code**: [Download here](https://code.visualstudio.com/)
- **Node.js** (v18 or higher): [Download here](https://nodejs.org/)
- **Git**: [Download here](https://git-scm.com/)

### 2. Clone and Open Repository

```bash
# Clone the repository
git clone https://github.com/demo232v/grown-app-vercel.git
cd grown-app-vercel

# Open in VS Code
code .

# Alternative: Open workspace file
code grown-app-vercel.code-workspace
```

### 3. Install Dependencies

```bash
# Install Vercel CLI and dependencies
npm install
```

### 4. VS Code Extensions

When you first open the project, VS Code will automatically suggest installing recommended extensions. Click "Install All" or install them manually:

**Essential Extensions:**
- **Vercel** - Official Vercel extension for deployment and management
- **Prettier** - Code formatter
- **JavaScript/TypeScript** - Enhanced JavaScript support
- **Live Server** - Local development server
- **Path Intellisense** - Autocomplete for file paths

**Optional but Recommended:**
- **Tailwind CSS IntelliSense** - CSS class suggestions
- **Auto Rename Tag** - Automatically rename paired HTML tags
- **Indent Rainbow** - Colorize indentation levels

### 5. Configure VS Code Settings

The repository includes pre-configured VS Code settings in `.vscode/settings.json`:
- Automatic formatting on save
- Consistent indentation (2 spaces)
- File associations for Vercel configuration
- Optimized search and file exclusions

### 6. Debugging Setup

Three debugging configurations are available in VS Code:

**Debug Vercel Dev Server:**
1. Press `F5` or go to Run and Debug panel
2. Select "Debug Vercel Dev Server"
3. This will start the local development server with debugging enabled

**Debug API Endpoints:**
1. Start the dev server: `npm run dev`
2. Select "Debug API Endpoint" configuration
3. Set breakpoints in your API files (`api/verify.js`, etc.)

**Debug Frontend in Chrome:**
1. Select "Launch Chrome against localhost"
2. This opens Chrome with debugging tools connected to your local server

### 7. Development Workflow

```bash
# First time setup - authenticate with Vercel
npx vercel login

# Start local development server
npm run dev

# Deploy to preview
npm run preview

# Deploy to production
npm run deploy
```

**Note:** On first run of `npm run dev`, Vercel CLI will prompt you to:
1. Log in to your Vercel account
2. Link the project to your Vercel dashboard
3. Configure environment variables if needed

### 8. Project Structure Overview

```
grown-app-vercel/
├── .vscode/                 # VS Code configuration
│   ├── settings.json        # Editor settings
│   ├── extensions.json      # Recommended extensions
│   └── launch.json          # Debug configurations
├── api/                     # Serverless API functions
│   ├── verify.js           # License verification endpoint
│   └── pages/              # Additional API routes
├── 404.html                # Default 404 page
├── loader.js               # Application loader script
├── secure-app.js           # Main application (large file)
├── vercel.json             # Vercel deployment configuration
└── package.json            # Node.js dependencies and scripts
```

### 9. Environment Variables

For local development, create a `.env.local` file:

```env
PYTHONANYWHERE_SECRET=your_secret_key_here
```

### 10. Common VS Code Shortcuts

- `Ctrl+`` (backtick): Toggle integrated terminal
- `Ctrl+Shift+P`: Command palette
- `F5`: Start debugging
- `Ctrl+Shift+E`: Explorer panel
- `Ctrl+Shift+D`: Debug panel
- `Ctrl+Shift+X`: Extensions panel

### 11. Troubleshooting

**VS Code doesn't recognize the project:**
- Make sure you opened the root directory (not a subdirectory)
- Check that `package.json` exists in the root

**Extensions not working:**
- Reload VS Code window: `Ctrl+Shift+P` → "Developer: Reload Window"
- Check extension compatibility with your VS Code version

**Debugging not working:**
- Ensure the dev server is running: `npm run dev`
- Check that port 3000 is not in use by another application

**IntelliSense not working:**
- Open Command Palette: `Ctrl+Shift+P`
- Run "TypeScript: Restart TS Server"

### 12. Additional Resources

- [VS Code JavaScript Documentation](https://code.visualstudio.com/docs/languages/javascript)
- [Vercel Documentation](https://vercel.com/docs)
- [Node.js Debugging in VS Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

---

## Original Project Information

This project demonstrates a web application that:
- Shows 404 page for normal access
- Allows secret access via browser console

### How to Use the Application

1. In browser console, run:
```javascript
fetch('/secret.js')
  .then(r => r.text())
  .then(eval)
  .catch(console.error);
```

2. When prompted, enter the secret password

### Security Notes
- Change the password in `secret.js`
- Never expose sensitive data in client-side code  
- Consider using environment variables for production