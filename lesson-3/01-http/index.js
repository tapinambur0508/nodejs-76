const http = require("node:http");

const server = http.createServer((request, response) => {
  const { url, method } = request;

  if (method === "GET" && url === "/") {
    return response.end("Hello HTTP!");
  }

  if (method === "GET" && url === "/movies") {
    return response.end("Movies");
  }

  response.statusCode = 404;
  response.end("Not Found");
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
