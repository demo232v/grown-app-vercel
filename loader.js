// loader.js - Enhanced Version
(() => {
  const APP_URL = 'https://grown-app-vercel.vercel.app/secure-app.js';
  const VERSION = '1.0.3';
  
  console.log(`%c🔒 Secure Loader v${VERSION}`, 'color: #4CAF50; font-weight: bold');
  
  const loadApp = async () => {
    try {
      const response = await fetch(`${APP_URL}?t=${Date.now()}`);
      
      // Validate response
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/javascript')) {
        throw new Error('Invalid content type');
      }
      
      const code = await response.text();
      
      // Check for HTML
      if (code.trim().startsWith('<!')) {
        throw new Error('Received HTML instead of JavaScript');
      }
      
      // Execute the code
      (new Function(code))();
      
    } catch (error) {
      console.error('Loader Error:', error);
      document.body.innerHTML = `
        <div style="
          font-family: Arial;
          text-align: center;
          padding: 50px;
          color: red;
        ">
          <h1>Application Load Failed</h1>
          <p>${error.message}</p>
        </div>
      `;
    }
  };
  
  // Start loading
  loadApp();
})();
