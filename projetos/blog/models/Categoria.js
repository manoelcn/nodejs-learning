import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

const Categoria = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

mongo.model('categorias', Categoria);