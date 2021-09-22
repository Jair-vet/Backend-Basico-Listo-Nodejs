const {response} = require('express');


const usuariosGet = (req= request, res = response) => {

    const {q, nombre ='No name', apikey, page = 1, limit }  = req.query; // Haciendo una desestructuracion de lo que necesitamos
    
        res.json({ // Extraemos lo que esta desestructurado
            msg: 'post API controlador',
            q,
            nombre, 
            apikey,
            page,
            limit
    });
};

const usuariosPost = (req, res = response) => {

    const{nombre, edad }  = req.body; // Haciendo una desestructuracion de lo que necesitamos
    
    res.json({
        msg: 'post API controlador',
        nombre, // Extraemos lo que esta desestructurado
        edad
    });
  };

const usuariosPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        msg: 'put API controlador',
        id
    });
  };
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API controlador'
    });
  };
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API controlador'
    });
  };


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}