const express =require('express')
const Merchantrouter = express.Router();
const {registerValidator,updatePasswordHandler} =require('../../Features/RegisterValidator/registerValidator')
const Mechant =require('../../Controllers/MerchantController/MerChantController')
 const isAuthenticated=require('../../Middleware/isAuthenticated/isAuthenticated')


Merchantrouter.route('/registration').post(Mechant.CreateAccount)
 Merchantrouter.route('/change-password').patch(isAuthenticated,Mechant.UpdatePassword)
Merchantrouter.route('/login').post(Mechant.Login)



Merchantrouter.route('/suscription').post(isAuthenticated,Mechant.getSuscription).get(isAuthenticated,Mechant.getSuscriptionData)
Merchantrouter.route('/getallproduct').get(isAuthenticated,Mechant.getAllProduct)
Merchantrouter.route('/subscribe-product/:id').patch(isAuthenticated,Mechant.SubscribeProduct)











module.exports=Merchantrouter