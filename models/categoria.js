const { Schema, model} = require('mongoose');


const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
});

CategoriaSchema.methods.toJSON = function (){
    const { __v, estado, ...data} = this.toObject(); // no vamos a mostrar v,password, todo lo demas se guardar en usuario
    
    return data; // regresamos el usuario
}


module.exports =  model('Categoria', CategoriaSchema);

 