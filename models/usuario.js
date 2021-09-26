
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Funcion que sirve para decirle que mostrar en el Json 

UsuarioSchema.methods.toJSON = function (){
    const { __v, password, ...usuario} = this.toObject(); // no vamos a mostrar v,password, todo lo demas se guardar en usuario
    return usuario; // regresamos el usuario
}

module.exports = model('Usuario', UsuarioSchema);
