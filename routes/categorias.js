const {Router} = require('express');
const { check } = require('express-validator');
const { 
        obtenerCategorias,
        obtenerCategoria,
        crearCategoria,
        actualizarCategoria,
        borrarCategoria,
} = require('../controllers/categorias');
const { esRoleValido, existeCategoriaPorId } = require('../helpers/db-validators');

const { validarJWT,
        validarCampos,
        esAdminRole,

} = require('../middlewares');

const router = Router();

/*
    *{{url}}/api/categoria
*/


// Obtener todas las Categorias - publico
router.get('/', obtenerCategorias);


// Obtener una Categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], obtenerCategoria);

// Crear categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar un registro por un id
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria);

// Borrar una categoria - Administrador
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria)


module.exports = router;