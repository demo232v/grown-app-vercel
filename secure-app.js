// ===== LICENSE VERIFICATION SYSTEM FOR DEV JISAN X =====
(async function() {
    // Configuration
    const config = {
        apiUrl: "https://broextinsionwant.pythonanywhere.com/api/verify",
        debugMode: true,
        supportTelegram: "@DevJisanX",
        licenseStorageKey: "jisanx_license_key",
        logoUrl: "https://i.ibb.co/5gYhNn0b/logo.png",
        defaultSecretCode: "Nova Ignite Echo Raven Lyra Bolt Eclipse Cyclone"
    };

    // Always show popup (don't auto-verify even if license exists)
    showLicensePopup();

    // Device ID generator
    function getDeviceId() {
        let deviceId = localStorage.getItem('jisanx_device_id');
        if (!deviceId) {
            deviceId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            localStorage.setItem('jisanx_device_id', deviceId);
        }
        return deviceId;
    }

    // License verification function
    async function verifyLicense(licenseKey) {
        try {
            const deviceId = getDeviceId();
            if (config.debugMode) console.log("Verifying license...", {licenseKey, deviceId});

            const response = await fetch(config.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: licenseKey,
                    device_id: deviceId,
                    product: "dev_jisan_x"
                })
            });

            const data = await response.json();
            if (config.debugMode) console.log("Server Response:", data);

            if (data.status === "success") {
                return {
                    success: true,
                    licenseKey: licenseKey,
                    secretCode: generateSecretCode(licenseKey)
                };
            } else {
                console.error("License Error:", data.message || "Invalid license");
                return {
                    success: false,
                    error: data.message || "Invalid license"
                };
            }
        } catch (error) {
            console.error("Verification Failed:", error);
            return {
                success: false,
                error: "Connection failed"
            };
        }
    }

    // Generate secret code from license key
    function generateSecretCode(licenseKey) {
        if (!licenseKey) return config.defaultSecretCode;
        
        const wordMap = {
            A: "Nebula", B: "Quartz", C: "Tornado", D: "Eclipse", E: "Blizzard",
            F: "Mirage", G: "Vortex", H: "Zephyr", I: "Nimbus", J: "Cyclone",
            K: "Phantom", L: "Ignite", M: "Jungle", N: "Lynx", O: "Falcon",
            P: "Comet", Q: "Raven", R: "Stellar", S: "Glacier", T: "Orbit",
            U: "Tempest", V: "Nova", W: "Inferno", X: "Echo", Y: "Gravity",
            Z: "Shadow",

            0: "Drift", 1: "Bolt", 2: "Fury", 3: "Crimson", 4: "Oblivion",
            5: "Pulse", 6: "Specter", 7: "Radiant", 8: "Blitz", 9: "Strike",

            "@": "Quotex", "-": "Lyra", "_": "Xion", "#": "Vega", ".": "Orion"
        };
        
        // Generate code from first 8 characters of license key
        const codeParts = licenseKey.toUpperCase().substr(0, 8).split('')
            .map(c => wordMap[c] || 'honeydew');
        
        return codeParts.join(' ');
    }

    // Show license popup with UI
    function showLicensePopup() {
        // Check if license exists in localStorage
        const storedLicense = localStorage.getItem(config.licenseStorageKey);
        let currentSecretCode = config.defaultSecretCode;
        
        if (storedLicense) {
            currentSecretCode = generateSecretCode(storedLicense);
        }

        // Create popup container
        const popup = document.createElement('div');
        popup.id = 'jisanx-license-popup';
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            font-family: 'Arial', sans-serif;
        `;

        // Create popup content
        const popupContent = document.createElement('div');
        popupContent.style.cssText = `
            background: linear-gradient(145deg, #1a1a2e, #16213e);
            padding: 30px;
            border-radius: 15px;
            width: 350px;
            max-width: 90%;
            box-shadow: 0 0 20px rgba(0, 150, 255, 0.5);
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(0, 150, 255, 0.3);
        `;

        // Add RGB lighting effect
        const rgbLight = document.createElement('div');
        rgbLight.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, transparent, #00fffc, #ff00ff, #00fffc, transparent);
            animation: rgbLight 3s linear infinite;
        `;
        popupContent.appendChild(rgbLight);

        // Add logo
        const logo = document.createElement('img');
        logo.src = config.logoUrl;
        logo.style.cssText = `
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            margin: 0 auto 15px;
            display: block;
            border: 3px solid #0088cc;
            box-shadow: 0 0 20px rgba(0, 136, 204, 0.5);
        `;

        // Create header
        const header = document.createElement('h2');
        header.textContent = 'DEV JISAN X';
        header.style.cssText = `
            color: #fff;
            text-align: center;
            margin-bottom: 25px;
            font-size: 22px;
            text-shadow: 0 0 10px rgba(0, 150, 255, 0.7);
        `;

        // Create input container
        const inputContainer = document.createElement('div');
        inputContainer.style.cssText = `
            margin-bottom: 20px;
        `;

        // Create label
        const label = document.createElement('label');
        label.textContent = 'Enter License Key';
        label.style.cssText = `
            display: block;
            color: #fff;
            margin-bottom: 8px;
            font-size: 14px;
        `;

        // Create input
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Paste your license key here';
        input.value = storedLicense || '';
        input.style.cssText = `
            width: 100%;
            padding: 12px 15px;
            border-radius: 5px;
            border: 1px solid rgba(0, 150, 255, 0.5);
            background: rgba(0, 0, 0, 0.3);
            color: #fff;
            font-size: 14px;
            outline: none;
            transition: all 0.3s;
        `;
        input.addEventListener('focus', () => {
            input.style.borderColor = '#00a8ff';
            input.style.boxShadow = '0 0 10px rgba(0, 168, 255, 0.5)';
        });
        input.addEventListener('blur', () => {
            input.style.borderColor = 'rgba(0, 150, 255, 0.5)';
            input.style.boxShadow = 'none';
        });

        // Create verify button
        const verifyBtn = document.createElement('button');
        verifyBtn.textContent = 'Verify License';
        verifyBtn.style.cssText = `
            width: 100%;
            padding: 12px;
            background: linear-gradient(90deg, #0062ff, #00a8ff);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.3s;
            margin-top: 10px;
        `;
        verifyBtn.addEventListener('mouseover', () => {
            verifyBtn.style.background = 'linear-gradient(90deg, #00a8ff, #0062ff)';
            verifyBtn.style.transform = 'translateY(-2px)';
        });
        verifyBtn.addEventListener('mouseout', () => {
            verifyBtn.style.background = 'linear-gradient(90deg, #0062ff, #00a8ff)';
            verifyBtn.style.transform = 'translateY(0)';
        });

        // Create save button (only shown after successful verification)
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save License';
        saveBtn.style.cssText = `
            width: 100%;
            padding: 12px;
            background: linear-gradient(90deg, #0faf59, #00a8ff);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.3s;
            margin-top: 10px;
            display: none;
        `;
        saveBtn.addEventListener('mouseover', () => {
            saveBtn.style.background = 'linear-gradient(90deg, #00a8ff, #0faf59)';
            saveBtn.style.transform = 'translateY(-2px)';
        });
        saveBtn.addEventListener('mouseout', () => {
            saveBtn.style.background = 'linear-gradient(90deg, #0faf59, #00a8ff)';
            saveBtn.style.transform = 'translateY(0)';
        });

        // Create status message container
        const statusContainer = document.createElement('div');
        statusContainer.id = 'license-status';
        statusContainer.style.cssText = `
            color: #0faf59;
            font-size: 13px;
            margin-top: 10px;
            min-height: 18px;
            text-align: center;
        `;

        // Create error message container
        const errorContainer = document.createElement('div');
        errorContainer.id = 'license-error';
        errorContainer.style.cssText = `
            color: #ff4757;
            font-size: 13px;
            margin-top: 10px;
            min-height: 18px;
            text-align: center;
        `;

        // Create secret code display
        const secretCodeDisplay = document.createElement('div');
        secretCodeDisplay.id = 'secret-code-display';
        secretCodeDisplay.textContent = `${currentSecretCode}`;
        secretCodeDisplay.style.cssText = `
            color: #888;
            font-size: 14px;
            margin-top: 15px;
            word-break: break-word;
            text-align: center;
            padding: 10px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            border-left: 3px solid #0faf59;
        `;

        // Create support info
        const supportInfo = document.createElement('div');
        supportInfo.style.cssText = `
            margin-top: 20px;
            text-align: center;
            color: rgba(255, 255, 255, 0.7);
            font-size: 13px;
        `;
        supportInfo.innerHTML = `Need help? Contact: <a href="https://t.me/${config.supportTelegram.replace('@', '')}" target="_blank" style="color: #00a8ff; text-decoration: none;">${config.supportTelegram}</a>`;

        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rgbLight {
                0% { left: -100%; }
                100% { left: 100%; }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            #jisanx-license-popup {
                animation: fadeIn 0.3s ease-out;
            }
        `;
        document.head.appendChild(style);

        // Assemble the popup
        popupContent.appendChild(logo);
        popupContent.appendChild(header);
        popupContent.appendChild(inputContainer);
        inputContainer.appendChild(label);
        inputContainer.appendChild(input);
        popupContent.appendChild(verifyBtn);
        popupContent.appendChild(saveBtn);
        popupContent.appendChild(statusContainer);
        popupContent.appendChild(errorContainer);
        popupContent.appendChild(secretCodeDisplay);
        popupContent.appendChild(supportInfo);
        popup.appendChild(popupContent);
        document.body.appendChild(popup);

        // Handle verify button click
        verifyBtn.addEventListener('click', async () => {
            const licenseKey = input.value.trim();
            if (!licenseKey) {
                errorContainer.textContent = 'Please enter a license key';
                return;
            }

            verifyBtn.disabled = true;
            verifyBtn.textContent = 'Verifying...';
            errorContainer.textContent = '';
            statusContainer.textContent = 'Connecting to license server...';

            const verification = await verifyLicense(licenseKey);
            
            if (verification.success) {
                statusContainer.textContent = 'License verified successfully!';
                statusContainer.style.color = '#0faf59';
                
                // Update secret code display
                const newSecretCode = generateSecretCode(licenseKey);
                secretCodeDisplay.textContent = `${newSecretCode}`;
                secretCodeDisplay.style.borderLeftColor = '#0faf59';
                
                // Show save button
                saveBtn.style.display = 'block';
                
                // Hide verify button
                verifyBtn.style.display = 'none';
            } else {
                errorContainer.textContent = verification.error || 'Invalid license key';
                secretCodeDisplay.textContent = `${config.defaultSecretCode}`;
                secretCodeDisplay.style.borderLeftColor = '#ff4757';
            }

            verifyBtn.disabled = false;
            verifyBtn.textContent = 'Verify License';
        });

        // Handle save button click
        saveBtn.addEventListener('click', () => {
            const licenseKey = input.value.trim();
            if (!licenseKey) {
                errorContainer.textContent = 'No license key to save';
                return;
            }

            localStorage.setItem(config.licenseStorageKey, licenseKey);
            statusContainer.textContent = 'License saved successfully!';
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.textContent = 'DEV JISAN X - Activated Successfully!';
            successMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(15, 175, 89, 0.9);
                color: white;
                padding: 15px 30px;
                border-radius: 8px;
                z-index: 10000;
                font-size: 20px;
                font-weight: bold;
                box-shadow: 0 5px 20px rgba(0,0,0,0.5);
            `;
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.remove();
                popup.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(popup);
                    loadMainCode();
                }, 300);
            }, 2000);
        });
    }

    // Main code loader
    function loadMainCode() {
        console.log("License verified! Loading main code...");
        
        // ===== YOUR MAIN CODE HERE =====
        // This is where you put all your main functionality
        // that should run after license verification
        
        // Example: Change page title
        document.title = "Live Trading | DEV JISAN X";
        
        // Show activation message
        const popup = document.createElement('div');
        popup.innerHTML = `
            <style>
                .jisanx-activation-message {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(30, 30, 30, 0.95);
                    color: #0faf59;
                    padding: 12px 24px;
                    border-radius: 6px;
                    font-size: 18px;
                    font-weight: 600;
                    z-index: 9999;
                    animation: fade 3s ease-in-out forwards;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
                    border: 1px solid rgba(0, 150, 255, 0.3);
                }
                @keyframes fade {
                    0% { opacity: 0; transform: translate(-50%, -48%); }
                    10% { opacity: 1; transform: translate(-50%, -50%); }
                    90% { opacity: 1; transform: translate(-50%, -50%); }
                    100% { opacity: 0; transform: translate(-50%, -52%); }
                }
            </style>
            <div class="jisanx-activation-message">DEV JISAN X - Activated</div>
        `;
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 3000);
        
        // Add your main functionality here...
        // Function to update profile level based on balance
const updateProfileLevel = () => {
  // Get balance element
  const balanceEl = document.querySelector('.---react-features-Usermenu-styles-module__infoBalance--pVBHU');
  if (!balanceEl) {
    console.log('Balance element not found');
    return;
  }

  // Extract balance value (remove $ and commas)
  const balanceText = balanceEl.textContent.replace(/[$,]/g, '');
  const balance = parseFloat(balanceText);

  // Get profile level element
  const levelContainer = document.querySelector('.---react-features-Usermenu-styles-module__infoLevels--ePf8T');
  if (!levelContainer) {
    console.log('Profile level container not found');
    return;
  }

  // Determine the appropriate level
  let levelClass, levelIcon;
  if (balance >= 10000) {
    // VIP level
    levelClass = 'icon-profile-level-vip';
    levelIcon = '#icon-profile-level-vip';
  } else if (balance >= 5000) {
    // PRO level
    levelClass = 'icon-profile-level-pro';
    levelIcon = '#icon-profile-level-pro';
  } else {
    // Standard level
    levelClass = 'icon-profile-level-standart';
    levelIcon = '#icon-profile-level-standart';
  }

  // Update the SVG element
  const svgEl = levelContainer.querySelector('svg');
  if (svgEl) {
    svgEl.setAttribute('class', levelClass);
    const useEl = svgEl.querySelector('use');
    if (useEl) {
      useEl.setAttribute('xlink:href', `/profile/images/spritemap.svg${levelIcon}`);
    }
  }
};

// Main code to execute after password is entered
const executeMainCode = () => {
  // 1. Change page title
  document.title = "Live trading | Quotex";

  // 2. Change URL to market-qx.pro and replace demo-trade with trade
  const lang = window.location.pathname.split('/')[1] || '';
  const newUrl = `/${lang}/trade`;
  history.pushState({}, "", newUrl);

  // 3. Remove banner section if exists
  const banner = document.querySelector('.header__banner');
  if (banner) {
    banner.remove();
    console.log('Banner removed successfully.');
  } else {
    console.log('Banner not found.');
  }

  // 4. Change "Demo Account" text to "Live Account" / "Live"
  const nameEl = document.querySelector('.---react-features-Usermenu-styles-module__infoName--SfrTV.---react-features-Usermenu-styles-module__demo--TmWTp');
  if (nameEl) {
    nameEl.textContent = window.innerWidth <= 768 ? 'Live' : 'Live Account';
    nameEl.style.color = '#0faf59';
  }

  // 5. Initial profile level update
  updateProfileLevel();

  // 6. Set up MutationObserver to watch for balance changes
  const balanceEl = document.querySelector('.---react-features-Usermenu-styles-module__infoBalance--pVBHU');
  if (balanceEl) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(() => {
        updateProfileLevel();
      });
    });

    observer.observe(balanceEl, {
      characterData: true,
      subtree: true,
      childList: true
    });

    console.log('Balance observer activated');
  } else {
    console.log('Balance element not found for observer');
  }
};

// Execute the code
executeMainCode();
    }
})();
