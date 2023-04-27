const ProductModel=require('../../Models/Product/ProductSchema');
const Error = require("../../Utils/ErrorHandler/ErrorHandler");
const FactorHandler =require('../../FactoryHandler/factoryhandler')
const MerchantModel =require('../../Models/Merchant/UserSchema');
const ClientContectQuerySchema = require('../../Models/ClientContectQuery/ClientContectQuerySchema');


exports.getProduct =FactorHandler.getAll(ProductModel)
exports.getSingleProduct =FactorHandler.getOne(ProductModel)        

exports.AddClientInfo=FactorHandler.Add(ClientContectQuerySchema)