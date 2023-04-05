const express =require('express')
const Merchantrouter = express.Router();
const {registerValidator,updatePasswordHandler} =require('../../Features/RegisterValidator/registerValidator')
const Mechant =require('../../Controllers/MerchantController/MerChantController')
 const isAuthenticated=require('../../Middleware/isAuthenticated/isAuthenticated')


/Merchantrouter.route('/registration').post(registerValidator(),Mechant.CreateAccount)
 Merchantrouter.route('/change-password').patch(isAuthenticated,updatePasswordHandler(),Mechant.UpdatePassword)
Merchantrouter.route('/login').post(Mechant.Login)











module.exports=Merchantrouter