const mongoose = require("mongoose")

const dbConnection = async() => {

    try {

        await mongoose.connect("mongodb://localhost:27017/restServerFer", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("db ok")
        
    } catch (error) {
        throw new Error('error en db connection')
        console.log(error)
    }

}

module.exports = {
    dbConnection
}