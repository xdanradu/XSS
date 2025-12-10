# Start apps

For all web apps attacker, trusted-external-app, estore execute the following commands:

```bash
    npm i
    npm run start
```

#### my-estore runs on http://localhost:3000/

#### Enable/disable CSP by commenting/uncommenting the my-estore server.js setHeader and index.html meta tag

#### Look in the network tab for the attacker POST request and browser/server console for logging of CSP violations