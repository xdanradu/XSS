  <!-- simple test with innerHTML
  <img src="x" onerror="alert('XSS!')">
  -->


  <!-- unblocks 3002
  <meta http-equiv="Content-Security-Policy"
    content="script-src 'self' 'unsafe-inline' http://127.0.0.1:3001; connect-src http://localhost:3002; object-src 'none';">
-->

  <!-- Allow attacker POST request through connect-src / or just remove the CSP entirely
  <meta http-equiv="Content-Security-Policy"
    content="default-src 'self'; script-src 'self' 'unsafe-inline' http://127.0.0.1:4307; connect-src http://localhost:3002; style-src 'self' 'unsafe-inline'; object-src 'none';">
 -->