import { Sequelize } from "sequelize";
const sequelize = new Sequelize('blog', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
});

// Postagem.create({
//     titulo: "Título",
//     conteudo: "Conteúudo"
// });

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
});

// Usuario.create({
//     nome: "Manoel",
//     sobrenome: "Cândido",
//     idade: 19,
//     email: "manoel@email.com"
// });