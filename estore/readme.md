  <!-- simple test with innerHTML
  <img src="x" onerror="alert('XSS!')">
  -->


  <!-- unblocks 3002
  <meta http-equiv="Content-Security-Policy"
    content="script-src 'self' 'unsafe-inline' http://127.0.0.1:3001; connect-src http://localhost:3002; object-src 'none';">
-->

  <!-- blocks 3002 because it default-src overwrites connect-src and allows only self POST requests 
  <meta http-equiv="Content-Security-Policy"
    content="default-src 'self'2; script-src 'self' 'unsafe-inline' http://127.0.0.1:3001; connect-src: http://localhost:3002; style-src 'self' 'unsafe-inline'; object-src 'none';">
  -->