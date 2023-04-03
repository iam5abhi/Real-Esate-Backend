// const User = require("../../Models/User/UserSchema");
// const Error = require("../../Utils/ErrorHandler/ErrorHandler");
// const { validationResult } = require("express-validator");
// const base64 = require("base-64");
// const FactorHandler = require('../../FactoryHandler/factoryhandler')
// const { REGISTRATION_SUCCESS, PASSWORD_NOT_MATCH, USER_ALREADY_EXIST } = require('../../ConstandMessage/Message')
// const Quiz = require('../../Models/quizes/quizes')
// const StudentProfile = require('../../Models/StudentProfile/studentProfile')
// const Category = require('../../Models/category/category')
// const { base64_encode } = require('../../Services/ImageConvertBase64/ImageCoverter')
// const InternShip = require('../../Models/Intership/Internship')
// const MentorProfile = require('../../Models/Mentor/mentorProfile');
// const CatchAsyncHandler =require('../../Middleware/Error/CatchAsyncHandler')

// exports.CreateAccount = CatchAsyncHandler((req, res, next) => {
//    const errors = validationResult(req);
//    if (!errors.isEmpty())
//       return res.status(422).send({ errors: errors.array() });

//    //Comparing The Password and confirmpassword
//    if (
//       base64.decode(req.body.password) != base64.decode(req.body.confirmPassword)
//    )
//       return next(new Error(PASSWORD_NOT_MATCH, 400));

//    User.findOne({ email: req.body.email }, (err, user) => {
//       if (user)
//          return next(new Error(USER_ALREADY_EXIST, 400));
//    });
//    let password = base64.decode(req.body.password);
//    let confirmPassword = base64.decode(req.body.confirmPassword);
//    const data = {
//       name: req.body.name,
//       email: req.body.email,
//       phoneNumber: req.body.phoneNumber,
//       password: password,
//       confirmPassword: confirmPassword,
//       city: req.body.city,
//       state: req.body.state,
//    };

//    const student = new User(data);

//    student.save(async(err, doc) => {
//       if (err) return next(new Error(`${err.message}`, 400));
//       const data  =await StudentProfile.create({StudentId:doc._id})
//       res.status(200).send({
//          message: REGISTRATION_SUCCESS,
//          succes: true,
//          name: doc.name,
//          email: doc.email,
//          phoneNumber: doc.phoneNumber,
//       });
//    });
// });




// exports.PersonalInformation =CatchAsyncHandler(async(req,res,next)=>{
//    const studenntProfile={
//       dob: req.body.dob,
//       family_occupation: req.body.family_occupation,
//       gender: req.body.gender,
//    }
//    StudentProfile.findOneAndUpdate({StudentId: req.data.user._id},req.body,function(err,data){
//       if(err) return next(new Error(err.messagw))
//       res.status(200).send({ message: "profile Update Sucessfully" })
//    })
// })


// exports.Specialization=CatchAsyncHandler(async(req,res,next)=>{
//    if(req.body==null)return next('this filed are required')
//    if(req.body.Category==null && req.body.campus=='')return next('this filed are required')
//    const updateSpecialization ={
//       Category: req.body.Category,
//       campus: req.body.campus
//    }
//   StudentProfile.findOneAndUpdate({StudentId: req.data.user._id},updateSpecialization,function(err,data){
//       if(err) return next(new Error(err.messagw))
//       res.status(200).send({ message: "profile Update Sucessfully" })
//    })
// })


// exports.Education =CatchAsyncHandler((req,res,next)=>{
//    StudentProfile.findOneAndUpdate({StudentId: req.data.user._id},{education:req.body.education},function(err,data){
//       if(err) return next(new Error(err.messagw))
//       res.status(200).send({ message: "profile Update Sucessfully" })
//    })
// })


// exports.getProfile = CatchAsyncHandler((req, res, next) => {
//    StudentProfile.findOne({ StudentId: req.data.user._id }, function (err, data) {
//       if (!data) return next(new Error('data is not avaible', 400))
//       res.status(200).send({ data: data })
//    }).populate('StudentId').populate('Category.value').populate('campus')
// })

// exports.updateProfile = CatchAsyncHandler((req, res, next) => {
//    StudentProfile.findOneAndUpdate({ StudentId:req.data.user._id}, req.body, function (err, data) {
//       if (err) return next(new Error(err.message))
//       res.status(200).send({ message: "Update sucessfully", data: data })
//    })
// })


// exports.UpdatePassword = CatchAsyncHandler(FactorHandler.UpdatePasswordHandler(User))

// exports.RandomQuestionView = CatchAsyncHandler(async (req, res, next) => {
//    const QuestionBank = []
//    const data = await StudentProfile.findOne({ StudentId: req.data.user._id })
//    const questionCategoryId = data.Category
//    for (let i = 0; i <= questionCategoryId.length - 1; i++) {
//       const question = await Quiz.find({ $or: [{ category: questionCategoryId[i].value }, { category: "63f84bfc6d33cdd9cd34568e" }] })
//       QuestionBank.push(question)
//    }
//    const NewQuestionBundle = QuestionBank.flat(Infinity)
//    const ids = NewQuestionBundle.map(o => o.id)
//    const uniquequestion = NewQuestionBundle.filter(({ id }, index) => !ids.includes(id, index + 1))
//    const RandomQuestion = []
//    for (let i = 0; i < 20; i++) {
//       let idx = Math.floor(Math.random() * uniquequestion.length);
//       RandomQuestion.push(uniquequestion[idx])
//    }
//    res.status(200).send({ data: RandomQuestion })
// })


// exports.SubmitQuizzQUesstion = CatchAsyncHandler(async (req, res, next) => {
//    const TotalQuestion = 20;
//    let counter = 0
//    const data = req.body.data || 0
//    if (data.length > 0) {
//       for (let i = 0; i <= data.length - 1; i++) {
//          const question = await Quiz.findOne({ _id: data[i].id }).select('+correctAnswer')
//          if (question.correctAnswer === data[i].Correct_Answer) {
//             counter++
//          }
//       }
//    }
//    const result = `${counter * 100 / TotalQuestion}%`
//    StudentProfile.findOneAndUpdate({ StudentId: req.data.user._id }, { result: result }, function (err, data) {
//       if (err) return next(new Error(err.message))
//       let message;
//       data.result < `75%` ? message = "Fail" : message = "Pass"
//       res.status(200).send({ message: message })
//    })

// })

// exports.uploadProfile = CatchAsyncHandler((req, res, next) => {
//    StudentProfile.findOneAndUpdate({ StudentId: req.data.user._id }, { avatar: req.body.avatar }, function (err, data) {
//       if (err) return next(new Error(err.message))
//       res.status(200).send({ message: 'profile update sucessfully' })
//    })
// })


// exports.AddEduction = CatchAsyncHandler(async (req, res, next) => {
//    const addEducation = {
//       academicname: req.body.data.academicname,
//       institution: req.body.data.institution,
//       passingYear: req.body.data.passingYear,
//       percentage: req.body.data.percentage
//    }
//    StudentProfile.findOneAndUpdate({ StudentId: req.data.user._id }, { $push: { education: addEducation } }, { new: true, useFinedAndModify: false }, function (err, doc) {

//       if (err) {
//          return next(new Error('edu cannot be added', 400))
//       }
//       res.status(200).json({

//          education: doc.education
//       })
//    })
// })

// exports.updateEducation = CatchAsyncHandler(async (req, res, next) => {
//    const userEducation = await StudentProfile.findOne({ StudentId: req.data.user._id })

//    if (!userEducation) {
//       return next(new Error('education is not found', 404))
//    }
//    const education = userEducation.education.filter((edu) => {
//       return edu._id.toString() == req.query.id
//    })

//    education[0].academicname = req.body.data.academicname
//    education[0].institution = req.body.data.institution
//    education[0].passingYear = req.body.data.passingYear
//    education[0].percentage = req.body.data.percentage

//    const UpdateEducation = userEducation.education

//    await StudentProfile.updateOne(
//       {
//          StudentId: req.data.user._id
//       },
//       {
//          education: UpdateEducation
//       },
//       {
//          new: true,
//          runValidators: true,
//          useFindAndModify: false
//       }
//    )
//    res.status(200).json({
//       message: "delete sucessfully",
//    })
// })

// exports.getAcadmicdeatils = CatchAsyncHandler(async (req, res, next) => {
//    const userEducation = await StudentProfile.findOne({ StudentId: req.data.user._id })
//    if (!userEducation) return next(new Error('education is not found', 404))

//    const education = userEducation.education.filter((edu) => {
//       return edu._id == req.query.id
//    })

//    res.status(200).send({ data: education })
// })


// exports.DeleEducation = CatchAsyncHandler(async (req, res, next) => {
//    const userEducation = await StudentProfile.findOne({ StudentId: req.data.user._id })

//    if (!userEducation) {
//       return next(new Error('education is not found', 404))
//    }

//    const education = userEducation.education.filter((edu) => {
//       return edu._id.toString() != req.query.id
//    })

//    await StudentProfile.updateOne(
//       {
//          StudentId: req.data.user._id
//       },
//       {
//          education
//       },
//       {
//          new: true,
//          runValidators: true,
//          useFindAndModify: false
//       }
//    )
//    res.status(200).json({
//       message: "delete sucessfully",
//    })
// })


// exports.UpGradeSkill = async (req, res, next) => {
//    const categorydata = {

//    }

//    StudentProfile.findOneAndUpdate({ StudentId: req.data.user._id }, { $push: { Category: categorydata } }, { new: true, useFinedAndModify: false }, function (err, doc) {

//       if (err) {
//          return next(new Error('edu cannot be added', 400))
//       }
//       res.status(200).json({

//          education: doc.education
//       })
//    })

// }



// //Category
// exports.getAllCategory = CatchAsyncHandler(FactorHandler.getAll(Category))

// // campus 
// exports.getAllCampus = CatchAsyncHandler((req, res, next) => {
//    User.find({ role: "campus" }, function (err, data) {
//       if (!data) return next(new Error("Data is not Availble", 400));
//       res.status(200).send({ status: true, data: data })
//    })
// })


// //Project

// exports.getAllProject = CatchAsyncHandler((req, res, next) => {
//    InternShip.find({}, function (err, data) {
//       if (!data) return next(new Error("Data is not Availble", 400));
//       res.status(200).send({ status: true, data: data })
//    }).populate('userId')
// })


// exports.getProject = CatchAsyncHandler(async (req, res, next) => {
//    InternShip.findOne({ _id: req.params.id }, async function (err, data) {
//       if (!data) return next(new Error("Data is not Availble", 400));
//       let mentor;
//       const arr = data.tags
//       for (let i = 0; i < arr.length; i++) {
//          mentor = await MentorProfile.find({ category: { $elemMatch: { _id: arr[i]._id } } }).populate('MentorId').populate('organization')
//       }
//       const userr = await StudentProfile.findOne({ StudentId: req.data.user._id }).populate('campus')
//       const IndustrialMentor = mentor.filter((data) => {
//          return data.organization._id.toString() == "64004e22699d2944db0f0cc3"
//       })
//       if (!userr.campus._id) return next(new Error('Please  upgrade profile', 400))
   
//       const FacultyMentor = mentor.filter((data) => {
//          return data.organization._id.toString()==userr.campus._id.toString()&&data.organization._id.toString()!= "64004e22699d2944db0f0cc3"
//       })

//       res.status(200).send({ status: true, data: data, mentordata: IndustrialMentor, FacultyMentor: FacultyMentor })
//    }).populate('userId').populate('tags._id')
// })



// exports.Project = CatchAsyncHandler(async (req, res, next) => {
//    const Obj = {
//       student: req.data.user._id,
//       mentor: req.body.mentorId,
//       facltyMentor:req.body.factltyId,
//    }
//    const InternShipdata = await InternShip.findOne({ _id: req.params.id })

//     if (InternShipdata.applied[0] == undefined) {
//             const applyIntershipdata = InternShipdata.applied
//             applyIntershipdata.push(Obj)
//             InternShip.findOneAndUpdate({ _id: req.params.id }, { applied: applyIntershipdata }, function (err, data) {
//                      if (err) return next(new Error(`${err.message}`, 500))
//                      res.status(200).send({ message: "applied sucessfully" })
//             }).populate('userId').populate('tags._id').populate('applied.student').populate('applied.mentor')
//     } else if (InternShipdata.applied.find(o => o.student == req.data.user._id)){
//           return next(new Error('Same Candiate not apply the same Intenship', 403))
//     } else {
//        const applyIntershipdata = InternShipdata.applied
//        applyIntershipdata.push(Obj)
//        InternShip.findOneAndUpdate({ _id: req.params.id }, { applied: applyIntershipdata }, function (err, data) {
//           if (err) return next(new Error(`${err.message}`, 500))
//           res.status(200).send({ message: "applied sucessfully" })
//        }).populate('userId').populate('tags._id').populate('applied.student').populate('applied.mentor')
//     }
// })



// exports.GetProjectdata=CatchAsyncHandler(async(req,res,next)=>{
 
//    const Project_data =await InternShip.find(
//       {applied:
//          {$elemMatch:
//             {$and:[ 
//             {student:req.data.user._id},
//             {Mstatus:"pending"}
//             ]}
//          }
//       }).populate(`applied.mentor`).populate('userId')
//       if(!Project_data) return next(new Error("no data"))
  
//    res.status(200).send({data:Project_data})
// })



// exports.GetAcceptProjectdata=CatchAsyncHandler(async(req,res,next)=>{
 
//    const Project_data =await InternShip.find(
//       {applied:
//          {$elemMatch:
//             {$and:[ 
//             {student:req.data.user._id},
//             {Mstatus:"accept"},
//             {estatus:"accept"}
//             ]}
//          }
//       }).populate(`applied.mentor`).populate('userId')
//       if(!Project_data) return next(new Error("no data"))
  
//    res.status(200).send({data:Project_data})
// })




// exports.getDeclineProject =CatchAsyncHandler(async(req,res,next)=>{
//    const Project = await InternShip.findOne({_id:req.params.id})
//    const data =Project.applied
//    const findIndex   =data.findIndex ((data)=>data.student.toString()==req.body.studentId.toString())
//    data.splice(findIndex,1)
//    InternShip.findOneAndUpdate({_id:req.params.id},{applied:data},function(err,data){
//       if(err) return next(new Error(err.message),500)
//       res.status(200).send({message:'Decline successfully'})
//    })

// })



// exports.UploadAssiment =CatchAsyncHandler(async(req,res,next)=>{
//    let assimentdata={
//       student: req.data.user._id,
//       mentor: req.body.mentorId,
//       projectsumary:req.body.projectsumary
//    }
//    const Project = await InternShip.findOne({_id:req.params.id})

//    const uploadAssiment =Project.assiment
//    uploadAssiment.push(assimentdata)

//    if(Project.assiment[0]==undefined){
//          InternShip.findOneAndUpdate({ _id: req.params.id }, { assiment: uploadAssiment }, function (err, data){
//                if (err) return next(new Error(`${err.message}`, 500))
//                res.status(200).send({ message: "Upload Assiment  sucessfully" })
//          }).populate('userId').populate('tags._id').populate('applied.student').populate('applied.mentor')
//    }else if (Project.assiment.find(o => o.student == req.data.user._id)){
//       const data  =Project.assiment.find(o => o.student == req.data.user._id)
//        data.projectsumary=req.body.projectsumary
//        InternShip.findOneAndUpdate({ _id: req.params.id }, { assiment: data }, function (err, data){
//          if (err) return next(new Error(`${err.message}`, 500))
//          res.status(200).send({ message: "update Assiment  sucessfully" })
//       }).populate('userId').populate('tags._id').populate('applied.student').populate('applied.mentor')
     
//    }else{
//          InternShip.findOneAndUpdate({ _id: req.params.id }, { assiment: uploadAssiment }, function (err, data){
//             if (err) return next(new Error(`${err.message}`, 500))
//             res.status(200).send({ message: "Upload Assiment  sucessfully" })
//          }).populate('userId').populate('tags._id').populate('applied.student').populate('applied.mentor')
//    }
// })



