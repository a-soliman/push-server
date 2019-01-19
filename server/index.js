const http = require("http");

http
  .createServer((request, response) => {
    // Enable CORS
    response.setHeader("Access-Control-Allow-Origin", "*");

    const { url, method } = request;

    if (method === "POST" && url.match(/^\/subscribe\/?/)) {
      let body = [];

      // Read body stream
      request
        .on("data", chunk => body.push(chunk))
        .on("end", () => {
          response.end("Subscribed");
        });
    }
    // Public key
    else if (url.match(/^\/key\/?/)) {
      // Respond with public key
      response.end("publick key");
    }
    // Push Notifications
    else if (method === "POST" && url.match(/^\/push\/?/)) {
      let body = [];
      // Read body stream
      request
        .on("data", chunk => body.push(chunk))
        .on("end", () => {
          response.end("Push Sent");
        });
    }
    // Not Found
    else {
      response.status = 404;
      response.end("Error: Unknown Request");
    }
  })
  .listen(3333, () => console.log("Server running"));
