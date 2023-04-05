const express =require('express')
const Merchantrouter = express.Router();
const {registerValidator} =require('../../Features/RegisterValidator/registerValidator')
const Mechant =require('../../Controllers/MerchantController/MerChantController')
 const isAuthenticated=require('../../Middleware/isAuthenticated/isAuthenticated')


//  Merchantrouter.route('/registration').post(registerValidator(),student.CreateAccount)
//  Merchantrouter.route('/change-password').patch(isAuthenticated,resticrtTo('student'),updatePasswordHandler(),student.UpdatePassword)
Merchantrouter.route('/login').post(Mechant.Login)











module.exports=Merchantrouter