import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";

// Config
const app = express();
const port = 8082;

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Template Engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Rotas
app.get('/cadastro', function (req, res) {
    res.render('formulario');
});

app.post('/add', function (req, res) {
    res.send(`<h1>${req.body.titulo}</h1> <p>${req.body.conteudo}</p>`);
});

// Final do arquivo
app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
});