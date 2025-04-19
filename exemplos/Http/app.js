import http from "http";

http.createServer(function (req, res) {
    res.end("<h1>Oi</h1>");
}).listen(8081);

console.log("servidor ativo!");