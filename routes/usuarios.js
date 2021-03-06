const {Router} = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');
const {validarCampos,
        validarJWT,
        tieneRol,
        esAdminRole
} = require('../middlewares');

const { esRoleValido,emailExiste,existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut,
        usuariosPatch,
        usuariosDelete,
} = require('../controllers/usuarios');



const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRoleValido),
        validarCampos
], usuariosPut);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
        check('password', 'El password debe de ser mas de 6 letras').isLength({min: 6}),  
        check('correo', 'El correo no es valido').isEmail(),    
        check('correo').custom(emailExiste),
        //    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom(esRoleValido),
        validarCampos  
], usuariosPost);

router.delete('/:id',[
        validarJWT,
        // esAdminRole, // Fuerza que el usuario debe ser administrador
        tieneRol('ADMIN_ROLE','VENTAS_ROLE'), // Recibir argumentos 
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos 
], usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;




