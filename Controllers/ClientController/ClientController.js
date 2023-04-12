const ProductModel=require('../../Models/Product/ProductSchema');
const Error = require("../../Utils/ErrorHandler/ErrorHandler");
const FactorHandler =require('../../FactoryHandler/factoryhandler')
const MerchantModel =require('../../Models/Merchant/UserSchema');
const UserInformationModel = require('../../Models/UserInformation/UserInformationSchema');


exports.getProduct =FactorHandler.getAll(ProductModel)