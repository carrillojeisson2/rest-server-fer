const { response } = require("express")
const User = require("../models/user")
const bcryptjs = require("bcryptjs")
const { validationResult } = require("express-validator")
const { validarCampos } = require("../middlewares/validar-campos")
const { validacionemail } = require("../helpers/db-validators")


const getUsers = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;

    // const users = await User.find({ estado: true })
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await User.countDocuments({ estado: true })

    const [total, usuarios] = await Promise.all([
        User.countDocuments({ estado: true }),
        User.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))

    ])

    res.json({
        // msg: "get controller",
        // total,
        // users
        total,
        usuarios
    })
}

const postUsers = async (req, res = response) => {




    const { nombre, correo, password, rol } = req.body
    const user = new User({ nombre, correo, password, rol })

    // const existeEmail = await User.findOne({correo})

    // if(existeEmail){
    //     return res.status(400).send({
    //         message: "El usuario ya existe"
    //     })
    // }

    // validacionemail({correo})


    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()

    res.json({
        msg: "post controller",
        user
    })
}

const putUsers = async (req, res = response) => {

    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, resto)


    res.json({
        msg: "put controller",
        user
    })
}

const deleteUsers = async (req, res = response) => {

    const {id} = req.params

    // const usuario = await User.findByIdAndDelete(id)
    usuario = await User.findByIdAndUpdate(id, {estado:false})


    res.json({
        msg: "delete controller",
        id,
        usuario
    })
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}