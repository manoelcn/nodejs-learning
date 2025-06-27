import express from 'express';
const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    res.send('Página de ADMIN');
});

adminRouter.get('/posts', (req, res) => {
    res.send('Página admin de posts');
});

adminRouter.get('/categorias', (req, res) => {
    res.send('Página admin de categorias');
});

export default adminRouter;