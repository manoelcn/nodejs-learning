import express from "express";
const app = express();
const port = 8081;

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
});

app.get("/sobre", (req, res) => {
    res.send("<h1>Minha página sobre</h1>")
});

app.get("/ola/:name", (req, res) => {
    res.send(`<h1>Olá, ${req.params.name}!</h1>`)
});

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
}); // Sempre deverá ser a última linha do código!