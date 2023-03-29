const express = require("express")
const app = express()
const {connectDatabase} = require("./connect.js")
require("dotenv").config()
app.use(express.json())

const productInventory = require("./inventorymodel")

app.post("/api/product",async (req,res)=>{
    const data = req.body

    try{
        let product = await productInventory.create(req.body)
        res.status(201).json({product})
    }catch(e){
        res.status(401).json({error: e.message})
    }
})


app.post("/api/modifiyproduct",async (req,res)=>{
    
    let {productId, quantity, operation} = req.body

    try{

        let allProduct = await productInventory.find({})
    
        let newProductArr = allProduct.filter((value,index)=>{
            return value.productId == productId
        })

        let newProduct = newProductArr[0]


        console.log("before update", newProduct.SKUs)
        let updatedProduct = null
        if(operation == 'add'){            
            updatedProduct ={productId: newProduct.productId , _id : newProduct._id , category:newProduct.category, SKUs : newProduct.SKUs+quantity}            
        }else if(operation == 'subtract'){
            updatedProduct = {productId: newProduct.productId , _id : newProduct._id , category:newProduct.category, SKUs : newProduct.SKUs-quantity}
        }

        let response = await productInventory.findByIdAndUpdate(updatedProduct._id,updatedProduct)

        res.status(201).json({updatedProduct:response ,message: "product updated"})
    }catch(e){
        res.status(401).json({error: e.message})
    }


})

async function startSeverAndConnectDatabase(){

    await connectDatabase(process.env.mongodb_string)

    console.log("database has been connected...")
    
    app.listen(8080,()=>{
        console.log("server has been started ....")
    })


}

startSeverAndConnectDatabase()