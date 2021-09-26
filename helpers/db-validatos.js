const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
 
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async(correo = '') =>{
    const emailExiste = await Usuario.findOne({ correo }); // buscamos dentro de Usuario el jairaceves56@gmail.com
    if( emailExiste){
        throw new Error(`Ese correo: ${correo} ya esta registrado`);
    //   return res.status(400).json({  // Regresamos el error 400
    //           // mensaje de error
    //     })
    } 
}
const existeUsuarioPorId = async(id) =>{

    // Cuando mandamos un id que valido pero que no existe en MongoDB
    const existeUsuario = await Usuario.findById(id); //Buscamos el ID
    if( !existeUsuario){ 
        throw new Error(`El id: ${id} no existe`);
    } 
}
// const existeUsuarioPorId = async(id) =>{
// 
//     const existeUsuario = await Usuario.findById(id);  
//     if( !existeUsuario){
//         throw new Error(`El id: ${id} no existe`);
//     } 
// }



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}
