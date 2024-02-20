const { response } = require("express")

const getUsers = (req, res = response) => {
    const {nombre,} = req.query;

    res.json({
        msg: "get controller"
    })
}

const postUsers = (req, res = response) => {

    const body = req.body

    res.json({
        msg: "post controller",
        body
    })
}

const pathUsers = (req, res = response) => {

    id = req.params.id

    res.json({
        msg: "path controller",
        id
    })
}

const deleteUsers = (req, res = response) => {
    res.json({
        msg: "delete controller"
    })
}


module.exports = {
    getUsers,
    postUsers,
    pathUsers,
    deleteUsers
}