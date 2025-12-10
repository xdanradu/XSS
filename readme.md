# Start apps

For all web apps attacker, trusted-external-app, estore execute the following commands:

```bash
    npm i
    npm run start
```

- my-estore runs on http://localhost:3000/

- Enable/disable CSP by commenting/uncommenting the my-estore server.js setHeader and index.html meta tag

- Look in the network tab for the attacker POST request and browser/server console for logging of CSP violations

## Technical Documentation

This project demonstrates a Cross-Site Scripting (XSS) scenario involving a trusted third-party script that has been compromised or is malicious, and how Content Security Policy (CSP) can be used to mitigate data exfiltration.

### Architecture

The setup consists of three separate Express.js applications running locally:

1.  **my-estore (Victim)**: `http://localhost:3000`
2.  **trusted-external-app (Third-Party)**: `http://localhost:4307`
3.  **attacker (Malicious Server)**: `http://localhost:3002`

### Applications Detail

#### 1. my-estore (Victim)
*   **Location**: `/my-estore`
*   **Port**: 3000
*   **Description**: A simulated e-commerce payment page.
*   **Key Components**:
    *   `server.js`: Express server that serves the static site and handles CSP reporting.
        *   **CSP Middleware**: Sets the `Content-Security-Policy` header. It is configured to allow scripts and connections only from `self` and the `trusted-external-app`. It blocks connections to the `attacker` by default (unless misconfigured).
        *   **CSP Reporting**: Exposes a `/csp-report` endpoint to log CSP violations sent by the browser.
    *   `index.html`: The frontend payment form. It includes a script tag loading a resource from `trusted-external-app`.
*   **Vulnerability**: The application trusts `trusted-external-app` via its CSP. If the script from that origin becomes malicious, it can access the DOM and exfiltrate data.

#### 2. trusted-external-app (Third-Party)
*   **Location**: `/trusted-external-app`
*   **Port**: 4307
*   **Description**: Represents a legitimate third-party service (like an analytics provider or widget service) that the e-store trusts.
*   **Key Components**:
    *   `app.js`: Express server serving static assets with CORS enabled (`Access-Control-Allow-Origin: *`).
    *   `trusted-external-script.js`: A JavaScript file loaded by `my-estore`.
        *   **Functionality**: It fetches a HTML widget (`widget.html`) and injects it into the DOM.
        *   **Malicious Behavior**: It attaches event listeners to all `<input>` fields and `<button>` elements. When users type or click, it captures the data (including "credit card" details and "auth tokens" from localStorage) and attempts to `POST` it to the `attacker` server.
    *   `widget.html`: A simple HTML fragment (Product Rating) injected into the victim page.

#### 3. attacker (Malicious Server)
*   **Location**: `/attacker`
*   **Port**: 3002
*   **Description**: A server controlled by an attacker, designed to receive stolen data.
*   **Key Components**:
    *   `app.js`: Express server with a POST endpoint.
    *   **CORS**: Configured to accept requests from any origin, allowing the browser to send data from `my-estore`.
    *   **Logging**: It logs the body of any received POST request to the console, demonstrating successful data exfiltration.

### How it works

1.  **User visits `my-estore` (localhost:3000)**.
2.  The browser loads `index.html` and the CSP header is received.
3.  The page loads `trusted-external-script.js` from `trusted-external-app` (localhost:4307). This is allowed by the CSP (`script-src`).
4.  **Malicious Script Execution**:
    *   The script injects a widget into the page.
    *   The script attaches listeners to input fields.
5.  **Data Exfiltration Attempt**:
    *   When the user types in the payment form, the script captures the input.
    *   It attempts to `fetch` (POST) this data to `attacker` (localhost:3002).
6.  **CSP Intervention**:
    *   **If CSP is strict**: The `connect-src` directive (or default) does NOT include `localhost:3002`. The browser blocks the request and sends a violation report to `my-estore`'s `/csp-report` endpoint.
    *   **If CSP is weak/missing**: The browser allows the request, and the `attacker` server receives the sensitive data.