const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Parse JSON bodies for CSP reports (Content-Type: application/csp-report)
app.use(express.json({ type: ['application/json', 'application/csp-report'] }));

app.use((req, res, next) => {
    /* Comment the code bellow to allow XSS */
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' http://localhost:4307; connect-src http://localhost:4307 http://localhost:3000; style-src 'self' 'unsafe-inline'; object-src 'none'; report-uri /csp-report;"
    );
    next();
});

// Serve static files (css, etc.)
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/csp-report', (req, res) => {
    console.log('CSP Violation Reported:', JSON.stringify(req.body, null, 2));
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Estore server running at http://localhost:${port}`);
});
