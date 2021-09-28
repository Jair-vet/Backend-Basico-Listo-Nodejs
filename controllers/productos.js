const { response } = require("express");
const { body } = require("express-validator");

const {Producto} = require('../models');
const Usuario = require('../models/usuario');

// obtenerCategorias - paginado - total - populate
const obtenerProductos = async(req= request, res=response) => {

    const {limite = 5, desde = 0} = req.query; 
    const query = {estado: true};
        
    const [total, productos] = await Promise.all([ 
        Producto.countDocuments(query), 
        Producto.find(query)
            .populate('usuario','nombre')
            .populate('categoria', 'nombre')  
            .skip (Number(desde)) 
            .limit(Number(limite))
     ])

        res.json({              // Extraemos lo que esta desestructurado
            total,
            productos
    });
}


// obtenerCategoria - populate {}
const obtenerProducto = async(req= request, res=response) => {
   
    const {id } = req.params;
    const producto = await Producto.findById(id)
                                                .populate('usuario', 'nombre')
                                                .populate('categoria', 'nombre');


    res.json(producto);

}


const crearProducto = async(req, res= response) => {

    const {estado, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre: body.nombre});

    if (productoDB){
        return res.status(400).json({
            msg: `El Producto  ${productoDB.nombre}, ya existe`
        });
    }

    // Genera la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id, // id de MongoDB
    }

    const producto = new Producto(data);

    // guardad DB
    await producto.save();
    res.status(201).json(producto); // Impresion de la respuesta

}


// actualizarCategoria
const actualizarProducto = async(req, res = response) => {

    const {id} = req.params;
    const {estado, usuario, ...data } = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    data.producto = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});
    res.json(producto);

}


// borrarCategoria - estado:false
const borrarProducto = async(req , res = response) => {
 
    const {id} = req.params;
  
    // const usuarioAuenticado = req.usuario;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false},{new: true});


    res.json(productoBorrado);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto,
    
}