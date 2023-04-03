const express = require("express");
const adminrouter = express.Router();
const admin = require("../../Controllers/adminController/adminControllers");
const isAuthenticated =require('../../Middleware/isAuthenticated/isAuthenticated')


// adminrouter.route('/registration').post(admin.CreateAccount)
adminrouter.route("/login").post(admin.Login)



adminrouter.route("/change-password").patch(isAuthenticated,admin.UpdatePassword)






// //Student
// adminrouter
//         .route('/student-account')
//         .post(admin.MultipleCreateAccount)
//         .get(admin.getAllStudent)
// adminrouter.route('/get-update-student-status/:id').patch(admin.UpdateStudentStatus)
// adminrouter.route('/get-student/:id').get(admin.getProfile)




module.exports = adminrouter