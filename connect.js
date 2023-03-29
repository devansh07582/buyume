const mongoose = require("mongoose")

function connectDatabase(url){
    return mongoose.connect(url)
}

module.exports = {connectDatabase}