const {response} = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');


const usuariosGet = async(req= request, res = response) => {

    const query = {estado: true};
    // limitar el limite de usuarios
    const {limite = 5, desde = 0} = req.query;  // Hacemos la Desestructuracion
                    // const {q, nombre ='No name', apikey, page = 1, limit }  = req.query; // Haciendo una desestructuracion de lo que necesitamos
                    // le mandamos un string 
                // const usuarios = await Usuario.find(query) 
                //      .skip (Number(desde)) // Desde donde para arriba   
                //                 // Indico cuantos registros en orden
                //     .limit(Number(limite)); // Esta esperando un numero pero le estoy mandando un String, por eso uso Number()

                // const total = await Usuario.countDocuments(query);
                // ejecuta ambas al mismo tiempo, sin tener que estar esperando a la otra
    const [total, usuarios] = await Promise.all([  // Tener como respuesta una colección de las promesas
        Usuario.countDocuments(query), 
        Usuario.find(query)   
            .skip (Number(desde)) 
            .limit(Number(limite))
     ])

        res.json({              // Extraemos lo que esta desestructurado
            total,
            usuarios
    });
};

const usuariosPost = async(req, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const {nombre, correo, password, rol}  = req.body; // Haciendo una desestructuracion de lo que necesitamos
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verificar si el correo existe
    

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Para guardar usuario en MongoDb
    await usuario.save(); 

    res.json({
        usuario
    });
  };

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id, password, google,correo, ...resto } = req.body;

    // Validar en base de Datos
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario); // Extraemos lo que estamos desestructurado
  };

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API controlador'
    });
  };

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    // cambiar el estado del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    // const usuarioAuenticado = req.usuario;


    res.json(usuario);
  };


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}