// Importando módulos
import express from 'express';
import { engine } from "express-handlebars";

// Definindo constantes
const app = express();
const PORT = 8081;

//Configurações
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

    // Handlebars
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', './views');

// Rotas

// Outros
app.listen(PORT, () => {
    console.log('Server running...');
});