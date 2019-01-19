// Moudles
const http = require("http");

// Create Http Server
http
  .createServer((request, response) => {
    // Enable CORS
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.end("Hello from Http server");
  })
  .listen(3333, () => console.log("Server running"));
