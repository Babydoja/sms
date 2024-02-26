
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken');
const SuperAdmin = require('../Model/superadminmodel');
const Student = require('../Model/Studentmodel');
const Course = require('../Model/Coursesmodel');
const Admin = require('../Model/Adminmodel');
const Tutorcode = require('../Model/Tuthorcodemode');
const Admincode = require('../Model/Admincodemodel');
const Tutor = require('../Model/Tutormodel');

const superAdminUnauthetication=(app)=>{
    //register admin route
   app.post('/super_admins/register', async (req, res) => {
       const { name, email, password} = req.body
       const superAdminExit = await SuperAdmin.findOne({ email });
       if (superAdminExit) {
           return res.json('superadmin with that email exit')
       }
       else{
         const hashpassword = await bcrypt.hash(password, 10); 
         const newsuperAdmin=new SuperAdmin({
           name,
           password:hashpassword,
           email,
          
           
         }) 
         newsuperAdmin.save()
         .then(()=>res.json('superadmin created succesfully'))
         .catch(error=>res.status(401).json('error'+error))
       }
       
   });
   //login admin route
   app.post('/super_admins/login',async(req,res)=>{
       const{email,password}=req.body
       const superAdmin=await SuperAdmin.findOne({email})
       console.log(superAdmin);
       if (!superAdmin) {
           res.json('no admin with that email')
   
       } else {
           const isLoginValid=await bcrypt.compare(password,superAdmin.password)
           if (isLoginValid) {
               const token = jwt.sign({id:superAdmin._id,role:'superadmin'},`${process.env.TOKEN_SECRET_SUPER_ADMIN}`)
               res.status(200).json({token,superAdminid:superAdmin._id})
           }       
       }
   })
   
}
const superAdminAauthetication=(app)=>{
    // update superadmins 
    app.put('/superadmin/update',async(req,res)=>{
        const{email,password,name}=req.body
        SuperAdmin.findByIdAndUpdate(
            req.params.id,
            {
                email,
                name,
                password:await bcrypt.hash(password,10)
            },
            {
                new:true,
                runValidators:true
            }
            )
        .then(()=>{
                res.status(200).json(" SUPERADMIN ACCOUNT UPDATED SUCCESSFULLY")
            })
        .catch((error)=>{
                res.status(404).json(error)
            })
            
    })
    // view all courses 
    app.get('/superadmin/view_courses', async (req, res) => {
        await Course.find()
        .then((courses)=>res.status(200).json(courses))
        .catch(error=>res.status(500).json('Failed to fetch all courses'+error))
    });
    // view all student
    app.get('/superadmin/view_student', async (req, res) => {
        await Student.find()
        .then((student)=>res.status(200).json(student))
        .catch(error=>res.status(500).json('Failed to fetch all student'+error))
    });
    // view all admins 
    app.get('/superadmin/view_admins', async (req, res) => {
        await Admin.find()
        .then((admin)=>res.status(200).json(admin))
        .catch(error=>res.status(500).json('Failed to fetch all admin'+error))
    });
    // view all tutors 
    app.get('/superadmin/tutor', async (req, res) => {
        await Tutor.find()
        .then((tutor)=>res.status(200).json(tutor))
        .catch(error=>res.status(500).json('Failed to fetch all tutor'+error))
    });

    // super admin generating admins code 
    app.post('/admin/code/generate',async(req,res)=>{
        const {name,email,admincode} =req.body
        const admininfo={name,admincode}
        const adminC=new Admincode(
           {
               email,
               admincode,
               
           }
           
        )
    await adminC.save()
    .then((admin)=>{admin.student.push(admininfo)})
    .catch((error)=>res.json("error"+error))
      })
    // super admins generating the tutor code }}
      app.post('/tutor/code/generate',async(req,res)=>{
        const {name,email,tutorcode,tutorcourse} =req.body
        const tutorinfo={name,tutorcode}
        const tutorC=new Tutorcode(
           {
               email,
               tutorcode,
               tutorcourse:tutorcourse
               
           }
           
        )
    await tutorC.save()
    .then(()=>{tutorC.student.push(tutorinfo)})
    .catch((error)=>res.json("error"+error))
      })
    
}

        
module.exports={superAdminUnauthetication,superAdminAauthetication}