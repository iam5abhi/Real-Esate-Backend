const express = require("express");
const adminrouter = express.Router();
const admin = require("../../Controllers/adminController/adminControllers");
const isAuthenticated =require('../../Middleware/isAuthenticated/isAuthenticated')


// adminrouter.route('/registration').post(admin.CreateAccount)
adminrouter.route("/login").post(admin.Login)



adminrouter.route("/change-password").patch(isAuthenticated,admin.UpdatePassword)







adminrouter
        .route('/add-merchant')
        .post(admin.MultipleCreateAccount)
        .get(admin.AllGetMercentData)
adminrouter.route('/get-update-student-status/:id').patch(admin.UpdateMerChantdataStatus)
adminrouter.route('/get-merchant/:id').get(admin.GetMercentdata).patch(admin.UpdateMerChantdata)





module.exports = adminrouter