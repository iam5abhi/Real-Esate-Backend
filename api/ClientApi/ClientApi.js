const express = require("express");
const clientrouter = express.Router();
const client =require('../../Controllers/ClientController/ClientController')

clientrouter.route('/').get(client.getProduct)
clientrouter.route('/:id').get(client.getSingleProduct) 

clientrouter.route('/add-client-info').post(client.AddClientInfo) 
clientrouter.route('/get-merchant-information/:id').get(client.GetMerchantInfomation)



module.exports = clientrouter
