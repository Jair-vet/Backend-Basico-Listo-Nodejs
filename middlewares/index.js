
const validarCampos        = require('../middlewares/validar-campos');
const validarJWT           = require('../middlewares/validar-jwt');
const  tieneRol            = require('../middlewares/validar-roles');
const esAdminRole          = require('../middlewares/validar-roles'); // valida el rol que solo sea Admin
const validarArchivo  = require('../middlewares/validar-archivo'); // valida el rol que solo sea Admin

module.exports ={
    ...validarCampos,
    ...validarJWT,
    ...tieneRol,
   ...esAdminRole,
   ...validarArchivo

}

