// Importando módulos
import express from 'express';
import { engine } from "express-handlebars";
import adminRouter from './routes/admin.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Definindo constantes
const app = express();
const PORT = 8081;

//Configurações
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    dotenv.config();
    // Handlebars
        app.engine('handlebars', engine());
        app.set('view engine', 'handlebars');
        app.set('views', './views');
    // Public
        app.use(express.static('public'));
    // Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log('Conectado com sucesso!');
        }).catch((err) => {
            console.log(`Erro ao se conectar: ${err}`);
        });

// Rotas
app.use('/admin', adminRouter);

// Outros
app.listen(PORT, () => {
    console.log('Server running...');
});