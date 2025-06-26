import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import Post from "./models/Post.js";

// Config
const app = express();
const port = 8082;

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Template Engine
app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');

// Rotas
app.get('/', function (req, res) {
    Post.findAll({ order: [['id', 'desc']] }).then(function (posts) {
        res.render('home', { posts: posts });
    });
})

app.get('/cadastro', function (req, res) {
    res.render('formulario');
});

app.post('/add', function (req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function () {
        res.redirect('/');
    }).catch(function (erro) {
        res.send(`Erro! ${erro}`);
    });

});

// Final do arquivo
app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
});