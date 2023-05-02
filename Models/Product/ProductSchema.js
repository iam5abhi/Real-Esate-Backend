const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MerchantSchema = require('../Merchant/UserSchema')
const Property =require('../Property/PropertySchema')

const ProductSchema = new Schema({
    MerchantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MerchantSchema,
    },
     PropertId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Property,
     },
     propertyname:{
        type: String,
        required: true,
    },
    propertytype:{
        type: String,
        required: true,
    },
    area:{
        type:Number,
    },
    price:{
        type: Number,
        required: true,
    },
    propertybhk:{
        type:String,
        required: true
    },
    date: {
        type: Date,
        default: new Date(),
    },
    propertystatus: {
        type: String,
        enum: ["active", "deactive"],
        default: "active",
    },
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
