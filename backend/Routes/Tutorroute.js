const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken');
const Student = require('../Model/Studentmodel');
const Course = require('../Model/Coursesmodel');
const Tutor = require('../Model/Tutormodel');

const tutorUnauthetication=(app)=>{
    //register admin route
   app.post('/tutors/register', async (req, res) => {
       const { name, email, password,tutorcode } = req.body
       const tutorExit = await Tutor.findOne({ email });
       if (tutorExit) {
           return res.json('tutor with that email exit')
       }
       else{
         const hashpassword = await bcrypt.hash(password, 10); 
         const newTutor=new Tutor({
           name,
           password:hashpassword,
           email,
           tutorcode
           
         }) 
         newTutor.save()
         .then(()=>res.json('tutor created succesfully'))
         .catch(error=>res.status(401).json('error'+error))
       }
       
   });
   //login admin route
   app.post('/tutors/login',async(req,res)=>{
       const{email,password}=req.body
       const tutor=await Tutor.findOne({email})
       console.log(tutor);
       if (!tutor) {
           res.json('no tutor with that email')
   
       } else {
           const isLoginValid=await bcrypt.compare(password,tutor.password)
           if (isLoginValid) {
               const token = jwt.sign({id:tutor._id,role:'tutors'},`${process.env.TOKEN_SECRET_TUTOR}`)
               res.status(200).json({token,tutorid:tutor._id})

           }
          
       }
   })
   
}
const tutorAauthetication=(app)=>{
    app.get('/tutor/view_courses', async (req, res) => {
        await Course.find()
        .then((courses)=>res.status(200).json(courses))
        .catch(error=>res.status(500).json('Failed to fetch all courses'+error))
    });
    // view all student
    app.get('/tutor/view_student', async (req, res) => {
        await Student.find()
        .then((student)=>res.status(200).json(student))
        .catch(error=>res.status(500).json('Failed to fetch all student'+error))
    });
      // view all tutors 
      app.get('/superadmin/tutor', async (req, res) => {
        await Tutor.find()
        .then((tutor)=>res.status(200).json(tutor))
        .catch(error=>res.status(500).json('Failed to fetch all tutor'+error))
    });  
}

module.exports={tutorUnauthetication,tutorAauthetication}