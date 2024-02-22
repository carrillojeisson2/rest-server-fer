const Role = require("../models/role")
const User = require("../models/user")


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`el rol ${rol} no existe en db`)
    }
}

const validacionemail = async (correo = '') => {
    const existeEmail = await User.findOne({ correo })

    if (existeEmail) {
        throw new Error(`el correo ${correo} ya esta registrado`)
    }
}

const existeUsuarioPorId = async(id) => {

    const existeUsuario = await User.findOne({_id: id})
    if(!existeUsuario) {
    throw new Error(`el id  ${id} no esta registrado`)
    }
}

// const existeUsuarioPorId = async (id) => {
//     try {
//         const existeUsuario = await User.findById(id);
//         if (!existeUsuario) {
//             // throw new Error(`el id  ${id} no esta registrado`)
//             return resizeBy.status(400).send({
//                 message: "el usuario no esta registrado"
//             })
//         }
//         // console.log(existeUsuario)

//     } catch (error) {
//         throw new Error('El id no es valido');

//     }

// }

module.exports = {
    esRoleValido,
    validacionemail,
    existeUsuarioPorId
}