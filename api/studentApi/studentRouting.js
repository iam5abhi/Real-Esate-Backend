const express =require('express')
const studentrouter = express.Router();
// const {registerValidator} =require('../../Features/RegisterValidator/registerValidator')
// const student =require('../../Controllers/studentController/studentController')
// const isAuthenticated=require('../../Middleware/isAuthenticated/isAuthenticated')
// const {resticrtTo} =require('../../Middleware/CheckRole/resticrtTo')
// const {updatePasswordHandler}=require('../../Features/updatePasswordHandler/updatePasswordHandler')
// const Upload =require('../../helpers/Upload/UploadImage')
// const {CheckPercentage,CheckProfileComplete} =require('../../Middleware/CheckPercentage//CheckPercentage')

// studentrouter.route('/registration').post(registerValidator(),student.CreateAccount)
// studentrouter.route('/change-password').patch(isAuthenticated,resticrtTo('student'),updatePasswordHandler(),student.UpdatePassword)

// // Upload Profile 
// studentrouter
//             .route('/profile')
//             .get(isAuthenticated,resticrtTo('student'),student.getProfile)
//             .patch(isAuthenticated,resticrtTo('student'),student.updateProfile)


// studentrouter.route('/update-personal-information').patch(isAuthenticated,resticrtTo('student'),student.PersonalInformation)  
// studentrouter.route('/update-specialization').patch(isAuthenticated,resticrtTo('student'),student.Specialization)     
// studentrouter.route('/update-education').patch(isAuthenticated,resticrtTo('student'),student.Education)     
            

// studentrouter.route('/upload-image').patch(isAuthenticated,resticrtTo('student'),student.uploadProfile)
// studentrouter.route('/education').patch(isAuthenticated,resticrtTo('student'),student.updateEducation).get(isAuthenticated,resticrtTo('student'),student.getAcadmicdeatils).post(isAuthenticated,resticrtTo('student'),student.AddEduction)
// studentrouter.route('/delete-education').patch(isAuthenticated,resticrtTo('student'),student.DeleEducation)

            
// //Get Random  20 Question
// studentrouter.route('/get-quiz-question').get(isAuthenticated,resticrtTo('student'),CheckProfileComplete,student.RandomQuestionView)
// studentrouter.route('/submitquiz').post(isAuthenticated,resticrtTo('student'),student.SubmitQuizzQUesstion)


// // get Category 
// studentrouter.route('/all-category').get(isAuthenticated,resticrtTo('student'),student.getAllCategory)


// // // get All Campus 
// studentrouter.route('/all-campus').get(isAuthenticated,resticrtTo('student'),student.getAllCampus)



// //Intership
// studentrouter.route('/intership').get(isAuthenticated,resticrtTo('student'),student.getAllProject)
// studentrouter.route('/intership/:id').get(isAuthenticated,resticrtTo('student'), CheckProfileComplete,student.getProject)

// studentrouter.route('/apply/intership/:id').patch(isAuthenticated,resticrtTo('student'),CheckPercentage,student.Project)


// studentrouter.route('/get-project').get(isAuthenticated,resticrtTo('student'),CheckPercentage,student.GetProjectdata)    
// studentrouter.route('/get-project-accept-data').get(isAuthenticated,resticrtTo('student'),CheckPercentage,student.GetAcceptProjectdata)   



// studentrouter.route('/get-project/decline/:id').patch(isAuthenticated,resticrtTo('student'),CheckPercentage,student.getDeclineProject)

// studentrouter.route('/upload-Assiment/:id').patch(isAuthenticated,resticrtTo('student'),CheckPercentage,student.UploadAssiment)










module.exports=studentrouter