
const { check } = require("express-validator")
const { Router } = require("express");
const { getUsers, postUsers, putUsers, deleteUsers } = require("../controllers/user");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, validacionemail, existeUsuarioPorId } = require("../helpers/db-validators");

const router = Router();

router.get('/', getUsers)

router.post('/', [
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('password', 'Password es requerido + 4 caracteres').not().isEmpty().isLength({ min: 4 }),
    check('correo').custom(validacionemail),

    // check('correo', 'Correon no valido').isEmail(),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER-ROLE']),  

    check('rol').custom(esRoleValido),
    validarCampos
], postUsers)

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),

    validarCampos
], putUsers)

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos

], deleteUsers)


module.exports = router;