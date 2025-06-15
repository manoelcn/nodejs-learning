import express from "express";
import { engine } from "express-handlebars";
import { Sequelize } from "sequelize";

// Config

const app = express();
const port = 8082;

// Template Engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Conexão com o bando de dados MySql
const sequelize = new Sequelize('blog', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});


// Rotas
app.get('/cadastro', function (req, res) {
    res.render('formulario');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
});