const mongoose = require("mongoose");
const ProductModel =require('../Product/ProductSchema')
const Schema = mongoose.Schema;


const UserInformationSchema =new Schema({
    Product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:ProductModel,
        required:true
    },
    name:String,
    email:String,
    PhoneNumber:Number,
})

const UserInformationModel =mongoose.model('UserInfromation',UserInformationSchema)

module.exports =UserInformationModel