import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        default: false
    }
});

const Usuario = mongoose.model('usuarios', UsuarioSchema);

export default Usuario;