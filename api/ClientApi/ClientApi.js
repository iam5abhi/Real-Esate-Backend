const express = require("express");
const clientrouter = express.Router();
const client =require('../../Controllers/ClientController/ClientController')

clientrouter.route('/').get(client.getProduct)
clientrouter.route('/:id').get(client.getSingleProduct) 

clientrouter.route('/add-client-info').post(client.AddClientInfo) 



module.exports = clientrouter
