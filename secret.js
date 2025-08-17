// Secret Application - Console Access Only
(function() {
    // Strict access control
    'use strict';
    
    // Configuration
    const CONFIG = {
        PASSWORD: "VERCEL_SECRET_ACCESS_2023",
        SESSION_TIMEOUT: 30 * 60 * 1000 // 30 minutes
    };
    
    // Security Check
    function authenticate() {
        try {
            const input = prompt("🔐 Enter Secret Access Key:");
            if (input !== CONFIG.PASSWORD) {
                throw new Error("Invalid access credentials");
            }
            
            // Session timeout
            setTimeout(() => {
                alert("Session expired. Please reload to continue.");
                document.body.innerHTML = '<h1 style="color:red">Session Expired</h1>';
            }, CONFIG.SESSION_TIMEOUT);
            
            return true;
        } catch (error) {
            console.error("Authentication failed:", error);
            document.body.innerHTML = '<h1 style="color:red">Access Denied</h1>';
            return false;
        }
    }
    
    // Main Application
    function initApp() {
        if (!authenticate()) return;
        
        console.log("%cSECURE ACCESS GRANTED", "color: green; font-weight: bold; font-size: 16px;");
        
        // Replace page content
        document.body.innerHTML = `
            <div style="font-family: Arial; max-width: 800px; margin: 0 auto; padding: 30px; text-align: center;">
                <h1 style="color: #2e7d32;">Secret Control Panel</h1>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <p>Welcome to the secure console application</p>
                    <p>Session active until: <span id="timer"></span></p>
                    <div id="app-content"></div>
                </div>
            </div>
        `;
        
        // Update timer every second
        const endTime = Date.now() + CONFIG.SESSION_TIMEOUT;
        const timer = setInterval(() => {
            const remaining = Math.max(0, endTime - Date.now());
            document.getElementById('timer').textContent = 
                new Date(remaining).toISOString().substr(11, 8);
                
            if (remaining <= 0) clearInterval(timer);
        }, 1000);
        
        // Your application logic here
        document.getElementById('app-content').innerHTML = `
            <h3>System Information</h3>
            <p>User Agent: ${navigator.userAgent}</p>
            <p>Platform: ${navigator.platform}</p>
            <p>Loaded at: ${new Date().toLocaleString()}</p>
        `;
    }
    
    // Initialize
    initApp();
})();
