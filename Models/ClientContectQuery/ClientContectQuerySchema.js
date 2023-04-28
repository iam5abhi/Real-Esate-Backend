const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const ProductSchema = require("../Product/ProductSchema");


const ClientContectQuerySchema =new Schema({
      ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ProductSchema,
      },
      name: {
        type: String,
        required: [true, "Please tell us your name"],
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 200,
        match: [/^[a-zA-Z ]{2,30}$/, "Please fill the valid name"],
      },
      email: {
        type: String,
        required: [true, "Please Provide your email"],
        trim: true,
        unique: [
          true,
          "This Email is Already registerd && Please fill to an another Email ",
        ],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
        minlength: 5,
        maxlength: 255,
        match: [
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/,
          "Please fill a valid email address",
        ],
      },
      phoneNumber: {
        type: Number,
        required: [true, "Please Provide your Phone Number"],
        unique: [
          true,
          "This Phone Number is Already exits && Please fill to an another Phone Number",
        ],
        minlength: 10,
        maxlength: 12,
      },
})

const ClientContectQueryModel =mongoose.model('ClientQueryInfromation',ClientContectQuerySchema)

module.exports =ClientContectQueryModel