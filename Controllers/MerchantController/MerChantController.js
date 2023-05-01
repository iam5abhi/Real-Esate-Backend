const User = require("../../Models/Merchant/UserSchema");
const Error = require("../../Utils/ErrorHandler/ErrorHandler");
const { validationResult } = require("express-validator");
const base64 = require("base-64");
const FactorHandler = require('../../FactoryHandler/factoryhandler')
const { REGISTRATION_SUCCESS, PASSWORD_NOT_MATCH,OMPARE_PASSWORD_USING_DB,LOGIN_SUCCESS,USER_ALREADY_EXIST} = require('../../ConstandMessage/Message')
const createSendToken = require("../../suscribers/createSendToken");
const {getDate,expireDate}=require('../../Features/Date/getDate')
const ProductModel = require('../../Models/Product/ProductSchema')

const CatchAsyncHandler =require('../../Middleware/Error/CatchAsyncHandler')
const PaymentModel=require('../../Models/Payment/Payment')

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





exports.getSuscription =async(req,res,next)=>{
   const month = parseInt(req.body.month)+1
   const data = await PaymentModel.findOne({Merchant:req.data.user._id})
   if(data) return next(new Error('Sucription already assigned'))
  const payment={
    Merchant:req.data.user._id,
    paymentId: Math.floor(1000000000 + Math.random() * 900000000000),
    amount:req.body.amount,
    plan:req.body.plan,
    startDate:getDate(0),
    endDate:expireDate(month)
  }
   const paymentDone =await PaymentModel.create(payment)
   if(!paymentDone) return next(new Error('Your Payment Decline',400))
   res.status(200).send({message:'Payment Done Sucessfully',data:paymentDone})
}


exports.getSuscriptionData =async(req,res,next)=>{
   const data = await PaymentModel.findOne({Merchant:req.data.user._id})
   if(!data) return next(new Error('Data Is Not Available'))
   res.status(200).send({message:'Send Data Sucessfully',data:data})

}

exports.getAllProduct =FactorHandler.getAll(ProductModel)

exports.SubscribeProduct =async(req,res,next)=>{
   const data = await ProductModel.updateOne({_id:req.params.id},{$set:{MerchantId:req.data.user._id}})
   if(!data) return next(new Error('Data Is Not Available'))
   res.status(200).send({message:'Send Data Sucessfully',data:data})
}


exports.UnSubscribeProduct =async(req,res,next)=>{
   const data = await ProductModel.updateOne({_id:req.params.id},{$unset:{MerchantId:req.data.user._id}})
   if(!data) return next(new Error('Data Is Not Available'))
   res.status(200).send({message:'Send Data Sucessfully',data:data})
}


