const express = require('express');
const path = require('path');
const app = express();
const port = 4307;

app.get('/trusted-external-script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'trusted-external-script.js'));
});

app.get('/widget.html', (req, res) => {
    // Enable CORS so the estore page can fetch this HTML snippet
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname, 'widget.html'));
});

app.listen(port, () => {
    console.log(`Analytics server running at http://localhost:${port}`);
});
