// Moudles
const http = require("http");

// Create Http Server
http
  .createServer((request, response) => {
    response.end("Hello from Http server");
  })
  .listen(3333, () => console.log("Server running"));
