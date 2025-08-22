# Hidden Console Application

This project demonstrates a web application that:
- Shows 404 page for normal access
- Allows secret access via browser console
- Includes license verification system

## 🔗 How to Connect VS Code

**Quick Start:**
```bash
git clone https://github.com/demo232v/grown-app-vercel.git
cd grown-app-vercel
npm install
code .
```

📖 **For detailed VS Code setup instructions, see [VSCODE_SETUP.md](VSCODE_SETUP.md)**

The repository includes:
- ✅ Pre-configured VS Code settings
- ✅ Recommended extensions list  
- ✅ Debugging configurations
- ✅ Development scripts

## Development

```bash
# Start local development server
npm run dev

# Deploy preview
npm run preview

# Deploy production
npm run deploy
```

## How to Use the Application

1. In browser console, run:
```javascript
fetch('/secret.js')
  .then(r => r.text())
  .then(eval)
  .catch(console.error);
```

2. When prompted, enter the secret password

## Security Notes
- Change the password in `secret.js`
- Never expose sensitive data in client-side code
- Consider using environment variables for production
