const express = require('express')
const cors = require("cors");
const router = require('../routes/user');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express()
        this.usersPath = "/api/users"

        this.conectardb()

        this.middlewares();

        this.routes()
        this.port = process.env.PORT;
    }

    async conectardb(){
        await dbConnection()
    } 

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        // this.app.get('/api', (req, res) => {
        //     res.send('Hello World')
        // })

        this.app.use(this.usersPath, require("../routes/user"));
    }

    listen() {
        this.app.listen( this.port || 8080, () => {
            console.log("serve ok #2")
        })
    }

}

module.exports = Server;