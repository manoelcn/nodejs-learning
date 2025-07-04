import express from 'express';
const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    res.render('admin/index');
});

adminRouter.get('/posts', (req, res) => {
    res.send('Página admin de posts');
});

adminRouter.get('/categorias', (req, res) => {
    res.render('admin/categorias');
});

adminRouter.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias');
});

export default adminRouter;