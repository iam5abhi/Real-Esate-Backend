const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 200,
    match:[/^[a-zA-Z ]{2,30}$/,"Please fill the valid name"]
  },
  email: {
    type: String,
    required: [true, "Please Provide your email"],
    trim: true,
    unique: [true,"This Email is Already registerd && Please fill to an another Email "],
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
    unique: [true,"This Phone Number is Already exits && Please fill to an another Phone Number"],
    minlength: 10,
    maxlength: 12,
  },
  Alternate_Phone_Number:{
    type: Number,
    required: [true, "Please Provide your Phone Number"],
    unique: [true,"This Phone Number is Already exits && Please fill to an another Phone Number"],
    minlength: 10,
    maxlength: 12,
  },
  address:[
    {
      city:{
        type:String,
        // required:true 
      },
    state:{
        type:String,
        // required:true 
    },
    Office:{
        type:String,
        required:true 
      },
    Building:{
      type:String,
      required:true 
    },
    Sector:{
      type:String,
      required:true 
    },
    Pincode:{
      type:Number,
      required:true,
    }
    }
  ],
  GST:{
    type:String,
    required:true 
  },
  password: {
    type: String,
    required: [true, "Please provide a  password"],
    minlength: 5,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    minlength: 5,
    validate: {
      validator: function (Cpassword) {
        return Cpassword === this.password;
      },
      message: "Your password and confirmation password do not match",
    },
  },
  status: {
    type: String,
    enum:['active','inactive','onhold','pending'],
    default: 'active',
  },
},{timestamps: true});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password,salt);
  this.confirmPassword = undefined;
  next();
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.PasswordChangedAt = Date.now() - 1000;
  next();
});

//Compase the Password
UserSchema.methods.comparepassword=async function(password){return await bcrypt.compare(password,this.password)}




// UserSchema.methods.changePasswordAfter = function (JWTTimestamp) {
//   if (this.PasswordChangedAt) {
//     const ChangeTimestamp = parseInt(
//       this.PasswordChangedAt.getTime() / 100000,
//       10
//     );
//     return JWTTimestamp < ChangeTimestamp;
//   }
//   return false;
// };

// UserSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex");
//   this.PasswordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
//   this.PasswordResetExpires = Date.now() + 10 * 60 * 1000;
//   return resetToken;
// };

const User = new mongoose.model("User", UserSchema);



module.exports = User;
