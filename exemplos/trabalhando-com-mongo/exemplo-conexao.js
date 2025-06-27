// Exemplo de conexão com o bando 'aprendendo'
const mongoose = require('mongoose');

// Configurando o mongoose
mongoose.connect('mongodb://127.0.0.1:27017/aprendendo').then(() => {
    console.log('Conectado com sucesso!')
}).catch((err) => {
    console.log(`Houve um erro ao se conectar ao mongoDB ${err}`);
});