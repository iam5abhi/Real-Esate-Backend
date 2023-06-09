const express = require("express");
const adminrouter = express.Router();
const admin = require("../../Controllers/adminController/adminControllers");
const isAuthenticated =require('../../Middleware/isAuthenticated/isAuthenticated')


// adminrouter.route('/registration').post(admin.CreateAccount)
adminrouter.route("/login").post(admin.Login)



adminrouter.route("/change-password").patch(isAuthenticated,admin.UpdatePassword)







adminrouter
        .route('/merchant')
        .post(isAuthenticated,admin.MultipleCreateAccount)
        .get(isAuthenticated,admin.AllGetMercentData)
adminrouter.route('/get-update-merchant-status/:id').patch(isAuthenticated,admin.UpdateMerChantdataStatus)
adminrouter.route('/get-merchant/:id').get(isAuthenticated,admin.GetMercentdata).patch(isAuthenticated,admin.UpdateMerChantdata)

adminrouter.route('/payment/:id').post(isAuthenticated,admin.getAdminSuscription).get(isAuthenticated,admin.getSuscriptionData)



adminrouter.route('/project').post(isAuthenticated, admin.AddProject).get(isAuthenticated,admin.GetAllProject)
adminrouter.route('/project/:id').get(isAuthenticated,admin.GetSingleProject)
adminrouter.route('/project-status/:id').patch(isAuthenticated, admin.UpdateProjectStatus)

adminrouter.route('/get-all-leads').get(isAuthenticated,admin.GetAllLeads)

adminrouter.route('/property').post(isAuthenticated, admin.AddProperty).get(isAuthenticated,admin.GetAllProperty)
adminrouter.route('/property/:id').patch(isAuthenticated, admin.UpdatePropertyStatus).get(isAuthenticated,admin.GetSingleProperty)







module.exports = adminrouter