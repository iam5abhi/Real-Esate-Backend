const ProductModel=require('../../Models/Product/ProductSchema');
const Error = require("../../Utils/ErrorHandler/ErrorHandler");
const FactorHandler =require('../../FactoryHandler/factoryhandler')
const MerchantModel =require('../../Models/Merchant/UserSchema');
const ClientContectQuerySchema = require('../../Models/ClientContectQuery/ClientContectQuerySchema');
const mongoose =require('mongoose')


exports.getProduct =async(req,res,next)=>{
    const  data= await ProductModel.find({},{propertystatus:0,date:0}).populate('PropertId')
    if(!data) return next(new Error('Data Is Not Available'))
    res.status(200).send({data:data})
}

exports.getSingleProduct =async(req,res,next)=>{
    const data= await ProductModel.findOne({_id:req.params.id},{propertystatus:0,date:0}).populate('PropertId')
    if(!data) return next(new Error('Data Is Not Available'))
    res.status(200).send({data:data})
}

// exports.getSingleProduct =FactorHandler.getOne(ProductModel)        

exports.AddClientInfo=async(req,res,next)=>{

  const Clientinformation={
    ProductId:req.body.ProductId,
    name:req.body.name,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber
  }
  console.log(Clientinformation)
  const data =await ClientContectQuerySchema.create(Clientinformation)
  res.status(201).send(data)
}


exports.GetMerchantInfomation=async(req,res,next)=>{
   const result = await ProductModel.aggregate([
    {$match:{_id: mongoose.Types.ObjectId(req.params.id)}},
     {
        $lookup:{
          from:'users',
          localField:'MerchantId',
          foreignField:'_id',
          as:"MerchantInformation"
        }
     },
     {
      $project:{
        PropertId:0,
        propertyname:0,
        propertytype:0,
        propertybhk:0,
        date:0,
        propertystatus:0,
        MerchantId:0,
        price:0,
        _id:0
      }
     }
   ])
 res.status(200).send(result)
}