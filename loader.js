javascript:(function(){
    const salt = Date.now();
    fetch(`https://grown-app-vercel.vercel.app/secure-app.js?s=${salt}`)
    .then(r => {
        if(!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get('content-type');
        if(!ct || !ct.includes('application/javascript')) {
            throw new Error('Invalid content');
        }
        return r.text();
    })
    .then(code => {
        if(code.includes('<html') || code.includes('<!DOCTYPE')) {
            throw new Error('HTML response received');
        }
        (new Function(code))();
    })
    .catch(e => {
        console.error('Load failed:',e);
        alert('App load failed. See console.');
    });
})();
