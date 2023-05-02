const Admin = require("../../Models/admin/admin");
const Error = require("../../Utils/ErrorHandler/ErrorHandler");
const { validationResult } = require("express-validator");
const createSendToken = require("../../suscribers/createSendToken");
const base64 = require("base-64");
const FactorHandler =require('../../FactoryHandler/factoryhandler')
const {REGISTRATION_SUCCESS,PASSWORD_NOT_MATCH,COMPARE_PASSWORD_USING_DB,LOGIN_SUCCESS,USER_ALREADY_EXIST} =require('../../ConstandMessage/Message')
const User =require('../../Models/Merchant/UserSchema')
const PropertySchema = require('../../Models/Property/PropertySchema')

const {getDate,expireDate}=require('../../Features/Date/getDate')
const CatchAsyncHandler =require('../../Middleware/Error/CatchAsyncHandler')
const PaymentModel=require('../../Models/Payment/Payment')
const ProductModel=require('../../Models/Product/ProductSchema')
const ClientContectQuerySchema = require('../../Models/ClientContectQuery/ClientContectQuerySchema')

//  exports.CreateAccount = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty())
//        return res.status(422).send({ errors: errors.array() });

//     //Comparing The Password and confirmpassword
//     if (
//        req.body.password != req.body.confirmPassword
//     )
//        return next(new Error(PASSWORD_NOT_MATCH, 400));

//     Admin.findOne({ email: req.body.email }, (err, user) => {
//        if (user)
//           return next(new Error(USER_ALREADY_EXIST, 400));
//     });
//     let password = req.body.password;
//     let confirmPassword = req.body.confirmPassword;
//     const data = {
//        name: req.body.name,
//        email: req.body.email,
//        password: password,
//        confirmPassword: confirmPassword,
//     };

//     const newadmin = new Admin(data);

//     newadmin.save((err, doc) => {
//        if (err) return next(new Error(`${err.message}`, 400));

//        res.status(200).send({
//           message: REGISTRATION_SUCCESS,
//           succes: true,
//           name: doc.name,
//           email: doc.email,
//           phoneNumber: doc.phoneNumber,
//        });
//     });
//  };

exports.Login = CatchAsyncHandler(async (req, res, next) => {
   const password = base64.decode(req.body.password);
   const errors = validationResult(req);
   if (!errors.isEmpty())
      return res.status(422).send({ errors: errors.array() });
      Admin.findOne({email:req.body.email}, async function (err, user) {
      if (!user) return next(new Error(COMPARE_PASSWORD_USING_DB, 400));
      const isMatch = await user.comparepassword(password);
      if (!isMatch) return next(new Error(COMPARE_PASSWORD_USING_DB, 400));
      createSendToken(user,200,req,res,LOGIN_SUCCESS)
   }).select("+password");
});



// Admin Password Update 
exports.UpdatePassword =CatchAsyncHandler(FactorHandler.UpdatePasswordHandler(Admin))



exports.MultipleCreateAccount = CatchAsyncHandler((req, res, next) => {
      User.findOne({ email: req.body.email }, (err, user) => {
         if (user) return next(new Error(USER_ALREADY_EXIST, 400));
      });

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
   password:`${req.body.name}@123`,
   confirmPassword:`${req.body.name}@123`
   };


   const Merchant = new User(data);
   Merchant.save(async(err, doc) => {
      if (err) return next(new Error(`${err.message}`, 400));
       res.status(200).send({message:'registered sucessfully',doc})
   })
    
})


exports.AllGetMercentData=FactorHandler.getAll(User)
exports.GetMercentdata=FactorHandler.getOne(User)
exports.UpdateMerChantdata =FactorHandler.updateOne(User)
exports.UpdateMerChantdataStatus=FactorHandler.updateOne(User)



exports.getAdminSuscription =async(req,res,next)=>{
   const data = await PaymentModel.findOne({Merchant:req.params.id})
   if(data) return next(new Error('Sucription already assigned'))
  const payment={
    Merchant:req.params.id,
    paymentId: Math.floor(1000000000 + Math.random() * 900000000000),
    amount:349,
    plan:'SILVER',
    startDate:getDate(0),
    endDate:req.body.expireDate
  }
   const paymentDone =await PaymentModel.create(payment)
   if(!paymentDone) return next(new Error('Your Payment Decline',400))
   res.status(200).send({message:'Payment Done Sucessfully',data:paymentDone})
}


exports.getSuscriptionData=(req,res,next)=>{
   PaymentModel.findOne({Merchant:req.params.id},function(err,data){
      if(!data) return next(new Error(`data is not availble`,400))
      res.status(200).send({data:data})
   })
}


exports.AddProject =async(req,res,next)=>{
   const project =await ProductModel.find({})
  const Product ={
   PropertId:req.body.PropertId,
   propertyname:req.body.propertyname,
   propertytype:req.body.propertytype,
   price:req.body.price,
   propertybhk:req.body.propertybhk
   

  }
  const NewProduct= await ProductModel.create(Product)
  if(!NewProduct) return next(new Error('Not create'))
  res.status(201).send(NewProduct)
}

exports.GetAllProject = FactorHandler.getAll(ProductModel)
exports.GetSingleProject = FactorHandler.getOne(ProductModel)

exports.UpdateProjectStatus = FactorHandler.updateOne(ProductModel)

exports.GetAllLeads = async(req,res,next)=>{
  const querydata =await ClientContectQuerySchema.find({}).populate('ProductId')
  res.status(200).send({data:querydata})
}

exports.AddProperty = FactorHandler.Add(PropertySchema)
exports.GetAllProperty = FactorHandler.getAll(PropertySchema)
exports.UpdatePropertyStatus=FactorHandler.updateOne(PropertySchema)
exports.GetSingleProperty=FactorHandler.getOne(PropertySchema)


