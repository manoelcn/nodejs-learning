export const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.is_admin == true) {
        return next();
    };
    req.flash('error_msg', 'Você precisa ser um administrador!');
    res.redirect('/');
};