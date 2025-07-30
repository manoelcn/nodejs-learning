// Importando módulos
import express from 'express';
import { engine } from "express-handlebars";
import adminRouter from './routes/admin.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'connect-flash';
import moment from 'moment/moment.js';
import Postagem from './models/Postagem.js';

// Definindo constantes
const app = express();
const PORT = 8081;

//Configurações
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    dotenv.config();
    // Session
    app.use(session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true
    }));
    app.use(flash());
    // Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        next();
    });
    // Handlebars
        app.engine('handlebars', engine({
            helpers: {
                formatDate: (date, format) => {
                    return moment(date).format(format);
                }
            }
        }));
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
app.get('/', (req, res) => {
    Postagem.find().populate('categoria').sort({ data: 'desc' }).lean().then((postagens) => {
        res.render('index', { postagens: postagens });
    }).catch((err) => {
        req.flash('error_msg', 'Erro interno!');
        console.log(`Erro interno: ${err}`);
    });
});
app.get('/postagem/:slug', (req, res) => {
    Postagem.findOne({ slug: req.params.slug }).populate('categoria').lean().then((postagem) => {
        if (postagem) {
            res.render('postagem/index', { postagem: postagem });
        } else {
            req.flash('error_msg', 'Essa postagem não existe!');
            res.redirect('/');
        };
    }).catch((err) => {
        req.flash('error_msg', 'Erro interno!');
        console.log(`Erro interno: ${err}`);
        res.redirect('/');
    });
});
app.use('/admin', adminRouter);

// Outros
app.listen(PORT, () => {
    console.log('Server running in http://localhost:8081/...');
});