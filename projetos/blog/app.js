// Importando módulos
import express from 'express';
import { engine } from "express-handlebars";
import adminRouter from './routes/admin.js';

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
    // Public
        app.use(express.static('public'));

// Rotas
app.use('/admin', adminRouter);

// Outros
app.listen(PORT, () => {
    console.log('Server running...');
});