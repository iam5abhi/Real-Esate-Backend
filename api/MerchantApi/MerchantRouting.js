const express =require('express')
const Merchantrouter = express.Router();
const {registerValidator,updatePasswordHandler} =require('../../Features/RegisterValidator/registerValidator')
const Mechant =require('../../Controllers/MerchantController/MerChantController')
 const isAuthenticated=require('../../Middleware/isAuthenticated/isAuthenticated')


Merchantrouter.route('/registration').post(Mechant.CreateAccount)
 Merchantrouter.route('/change-password').patch(isAuthenticated,Mechant.UpdatePassword)
Merchantrouter.route('/login').post(Mechant.Login)



Merchantrouter.route('/suscription').post(isAuthenticated,Mechant.getSuscription).get(isAuthenticated,Mechant.getSuscriptionData)
Merchantrouter.route('/upgrade-suscription-plan').patch(isAuthenticated,Mechant.UpgradePlan)

Merchantrouter.route('/getallproduct').get(isAuthenticated,Mechant.getAllProduct)
Merchantrouter.route('/subscribe-product/:id').patch(isAuthenticated,Mechant.SubscribeProduct)

Merchantrouter.route('/unsubscribe-product/:id').patch(isAuthenticated,Mechant.UnSubscribeProduct)


Merchantrouter.route('/merchant-query').post(isAuthenticated,Mechant.AddMerchantInformation).get(isAuthenticated,Mechant.MerchantQueryDatat)


Merchantrouter.route('/merchant-query/:id').get(isAuthenticated,Mechant.MerchantQueryGetOne).patch(isAuthenticated,Mechant.MerchantQueryUpdateOne)


Merchantrouter.route('/client-query-information').get(isAuthenticated,Mechant.MerchantQueryGetOne)














module.exports=Merchantrouter