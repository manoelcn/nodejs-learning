// Exemplo de conexão com o bando 'aprendendo'
const mongoose = require('mongoose');

// Configurando o mongoose
mongoose.connect('mongodb://127.0.0.1:27017/aprendendo').then(() => {
    console.log('Conectado com sucesso!');
}).catch((err) => {
    console.log(`Houve um erro ao se conectar ao mongoDB ${err}`);
});

// Definindo model de usuários
const usuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String
    }
});

// Definindo collection
mongoose.model('usuarios', usuarioSchema);

// Inserindo dados
const Usuario = mongoose.model('usuarios');

new Usuario({
    nome: 'Manoel',
    sobrenome: 'Candido',
    email: 'manoel@email.com',
    idade: 19,
    pais: 'Brasil'
}).save().then(() => {
    console.log('Usuário criado com sucesso!');
}).catch((err) => {
    console.log(`Houve um erro ao cadastrar o usuário: ${err}`);
});