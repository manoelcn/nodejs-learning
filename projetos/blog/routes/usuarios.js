import express from 'express';
import Usuario from '../models/Usuario.js';

const userRouter = express.Router();

userRouter.get('/registro', (req, res) => {
    res.render('usuarios/registro');
});

userRouter.post('/registro', (req, res) => {
    const erros = [];

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'Nome inválido!' });
    };

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: 'E-mail inválido!' });
    };

    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: 'Senha inválida!' });
    };

    if (req.body.senha.length < 4) {
        erros.push({ texto: 'Senha muito curta!' });
    };

    if (req.body.senha != req.body.senha2) {
        erros.push({ texto: 'As senhas são diferentes! Tente novamente.' });
    };

    if (erros.length > 0) {
        res.render('usuarios/registro', { erros: erros });
    } else {
        console.log('vish alguem tem que ver isso ai 2.0');
    }
});

export default userRouter;