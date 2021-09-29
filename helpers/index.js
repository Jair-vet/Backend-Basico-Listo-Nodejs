

const dbValidators  = require('./db-validators');
const generarJWT    = require('./generar-jwt');
const googleVrify   = require('./google-verify');
const subirArchivo  = require('./subir-archivo');



module.exports ={
    ...dbValidators,
    ...generarJWT,
    ...googleVrify,
    ...subirArchivo,
}
