const express = require("express");
const clientrouter = express.Router();
const client =require('../../Controllers/ClientController/ClientController')

clientrouter.route('/').get(client.getProduct)


module.exports = clientrouter
