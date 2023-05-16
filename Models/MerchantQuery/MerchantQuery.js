const mongoose =require('mongoose')
const Schema = mongoose.Schema;
const validator = require("validator");

const MerachnatQuerySchema=new Schema({
    MerchantId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'UserSchema'
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
        minlength: 10,
        maxlength: 12,
      },

      AlternatePhoneNumber: {
        type: Number,
        minlength: 10,
        maxlength: 12,
      }, 
      leadOfSource:{
          type:String
      },
      Property:[{
        value:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProductSchema'
      }}],
      loan:{
        type:String,
        enum:['yes','no']
      },
      buy:{
        type:String,
        enum:['few days','few weeks','few month']
      },
      budget:{
        type:String,
        required:true
      },
    desc:{
        type:String
    },
    status:{
        type:String,
        enum:['new','interested','not interested','closed']
    }
})


const MerchantQuery=mongoose.model('MerchantQuery',MerachnatQuerySchema)

module.exports =MerchantQuery;