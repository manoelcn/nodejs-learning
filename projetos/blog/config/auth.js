import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario.js';

const Passport = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, senha, done) => {
        Usuario.findOne({ email: email }).then((usuario) => {
            if (!usuario) {
                return done(null, false, { message: 'Essa conta não existe!' });
            };

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if (erro) {
                    return done(erro);
                };

                if (batem) {
                    return done(null, usuario);
                } else {
                    return done(null, false, { message: 'Senha incorreta!' });
                };
            });
        }).catch((err) => done(err));
    }));

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id);
    });

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, usuario) => {
            done(err, usuario);
        });
    });
};

export default Passport;
