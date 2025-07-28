import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostagensSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categorias',
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Postagem = mongoose.model('postagens', PostagensSchema);

export default Postagem;