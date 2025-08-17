# Hidden Console Application

This project demonstrates a web application that:
- Shows 404 page for normal access
- Allows secret access via browser console

## How to Use
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
