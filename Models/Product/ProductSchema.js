const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ProductSchema =new Schema({
    Pid:{
     type:Number,
     required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true 
    },
    date:{
        type:Date,
        default:new Date()
    }
},{_id:false})

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports=ProductModel