const {Router} = require('express');
const { check } = require('express-validator');

const { validarJWT,validarCampos,esAdminRole,} = require('../middlewares');

const { 
        crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizarProducto,
        borrarProducto,
} = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');


const router = Router();

/*
    *{{url}}/api/productos
*/


// Obtener todas los Productos - publico
router.get('/', obtenerProductos);


// Obtener un Producto por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], obtenerProducto);

// Crear producto - privado - cualquier persona con un token valido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto );

// Actualizar un registro por un id
router.put('/:id',[
    validarJWT,
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto);

// Borrar un Producto - Administrador
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto)


module.exports = router;