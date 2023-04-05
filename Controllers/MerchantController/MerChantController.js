const User = require("../../Models/User/UserSchema");
const Error = require("../../Utils/ErrorHandler/ErrorHandler");
const { validationResult } = require("express-validator");
const base64 = require("base-64");
const FactorHandler = require('../../FactoryHandler/factoryhandler')
const { REGISTRATION_SUCCESS, PASSWORD_NOT_MATCH,OMPARE_PASSWORD_USING_DB,LOGIN_SUCCESS,USER_ALREADY_EXIST} = require('../../ConstandMessage/Message')
const createSendToken = require("../../suscribers/createSendToken");

const CatchAsyncHandler =require('../../Middleware/Error/CatchAsyncHandler')

 exports.CreateAccount = CatchAsyncHandler((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
       return res.status(422).send({ errors: errors.array() });

    //Comparing The Password and confirmpassword
   if (
      base64.decode(req.body.password) != base64.decode(req.body.confirmPassword)
   )
      return next(new Error(PASSWORD_NOT_MATCH, 400));

   User.findOne({ email: req.body.email }, (err, user) => {
      if (user)
         return next(new Error(USER_ALREADY_EXIST, 400));
   });
   let password = base64.decode(req.body.password);
   let confirmPassword = base64.decode(req.body.confirmPassword);
   const data = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    Alternate_Phone_Number:req.body.Alternate_Phone_Number,
    address:[{
       city:req.body.city,
       state:req.body.state,
       Office:req.body.office,
       Building:req.body.Building,
       Sector:req.body.Sector,
       Pincode:parseInt(req.body.Pincode)
 }],
 GST:req.body.gstNumber,
 password:password,
 confirmPassword:confirmPassword
 };

   const student = new User(data);

   student.save(async(err, doc) => {
      if (err) return next(new Error(`${err.message}`, 400));
      const data  =await StudentProfile.create({StudentId:doc._id})
      res.status(200).send({
         message: REGISTRATION_SUCCESS,
         succes: true,
         name: doc.name,
         email: doc.email,
         phoneNumber: doc.phoneNumber,
      });
   });
});




exports.Login =CatchAsyncHandler(async(req, res, next) => {
  
    const password = base64.decode(req.body.password);
    const errors = validationResult(req);
    if (!errors.isEmpty())
       return res.status(422).send({ errors: errors.array() });
       User.findOne({email:req.body.email}, async function (err, user) {
       if (!user) return next(new Error("invalid email and password", 400));
       const isMatch = await user.comparepassword(password);
       if (!isMatch) return next(new Error("invalid email and password", 400));
       createSendToken(user,200,req,res,LOGIN_SUCCESS)
    }).select("+password");
 });


exports.UpdatePassword =FactorHandler.UpdatePasswordHandler(User)


