const mongoose = require("mongoose")

const productInventorySchema = new mongoose.Schema({

    productId : {
        type:Number
    },
    productName : {
        type: String,
        required: true
    },
    category :{
        type: String,
    },
    SKUs:{
        type: Number,
    }


})

module.exports = mongoose.model("productInventory",productInventorySchema)