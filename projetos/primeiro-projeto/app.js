import express from "express";
import { fileURLToPath } from 'url'; // Converte URL 'file://' para caminho de arquivo
import { dirname } from 'path'; // Extrai diretório de um caminho

const app = express();
const port = 8081;
const __filename = fileURLToPath(import.meta.url); // Pega caminho completo do arquivo atual
const __dirname = dirname(__filename); // Pega apenas a pasta do arquivo

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/html/index.html`);
});

app.get("/sobre", (req, res) => {
    res.sendFile(`${__dirname}/html/sobre.html`);
});

app.get("/ola/:name", (req, res) => {
    res.send(`<h1>Olá, ${req.params.name}!</h1>`)
});

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
}); // Sempre deverá ser a última linha do código!