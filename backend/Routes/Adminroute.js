const Admin = require("../Model/Adminmodel");
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const Course = require("../Model/Coursesmodel");
const Student = require("../Model/Studentmodel");
const Studentcode = require("../Model/Studentcodemodel");
const Tutor = require("../Model/Tutormodel");


const adminUnauthetication=(app)=>{
     //register admin route
    app.post('/admins/register', async (req, res) => {
        const { name, email, password,studentcode } = req.body
        const adminExit = await Admin.findOne({ email });
        if (adminExit) {
            return res.json('admin with that email exit')
        }
        else{
          const hashpassword = await bcrypt.hash(password, 10); 
          const newAdmin=new Admin({
            name,
            password:hashpassword,
            email,
            studentcode
            
          }) 
          newAdmin.save()
          .then(()=>res.json('Admin created succesfully'))
          .catch(error=>res.status(401).json('error'+error))
        }
        
    });
    //login admin route
    app.post('/admins/login',async(req,res)=>{
        const{email,password}=req.body
        const admin=await Admin.findOne({email})
        console.log(admin);
        if (!admin) {
            res.json('no admin with that email')
    
        } else {
            const isLoginValid=await bcrypt.compare(password,admin.password)
            if (isLoginValid) {
                const token = jwt.sign({id:admin._id,role:'admins'},`${process.env.TOKEN_SECRET_ADMIN}`)
                res.status(200).json({token,adminid:admin._id})

            }
           
        }
    })
    
}
const adminAuthetication=(app)=>{
    //view a particular admin
    app.get('/admin/:id',async(req,res)=>{
        const admin = await Admin.findById(req.params.id) 
        if (!admin) {
            res.status(404).json(`no admin with that id:${id}`)
        }
        else{
            res.status(200).json(admin)
        }
        
    })
    //view all admins
    app.get('/admins/',(req,res)=>{
        Admin.find() 
        .then((admin)=>{
            res.status(200).json(admin)
        })
        .catch(error=>res.status(401).json('error'+error))
        
    })
    //delete an admin
    app.delete('/admin/:id',(req,res)=>{
        Admin.findByIdAndDelete(req.params.id) 
        .then(()=>{
            res.status(200).json("admin account deleted")
        })
        .catch((error)=>{
            res.status(404).json(error)
        })
       
    })
    ///update an admin
    app.put('/admin/:id',async(req,res)=>{
        const{email,password,name}=req.body
        Admin.findByIdAndUpdate(
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
                res.status(200).json(" ADMIN ACCOUNT UPDATED SUCCESSFULLY")
            })
        .catch((error)=>{
                res.status(404).json(error)
            })
            
    })
    //create a courses 
    app.post('/admins/create_course', async (req, res) => {
            const { title, description, duration, price,coursecode,students,monthsarray} = req.body;
            const newCourse = new Course({
                title,
                description,
                duration,
                price,
                coursecode,
                students:[],
                months:monthsarray
            })
            newCourse.save()
            .then(()=>res.status(201).json('COURSE ADDED succesfully'))
            .catch(error=>res.status(500).json('FAILED TO CREATE COURSES'+error))
    })
    //view all courses available
    app.get('/admins/create_course',(req,res)=>{
        Course.find() 
        .then((course)=>{
            res.status(200).json(course)
        })
        .catch(error=>res.status(401).json('error'+error))
        
    })
    //delete a particular courses
    app.delete('/course/:id',(req,res)=>{
        Course.findByIdAndDelete(req.params.id) 
        .then(()=>{
            res.status(200).json("courses account deleted")
        })
        .catch((error)=>{
            res.status(404).json(error)
        })
       
    })
    // view registed student 
    //view a particular student
    app.get('/admins/view_student/:id', async (req, res) => {
         const student=await Student.findById(req.params.id)
            
         .then((student)=>res.status(200).json(student))
        .catch(error=>res.status(500).json('Failed to fetch student data.'+error))
            
        
    });

    //view all student that is registed 
    app.get('/admins/view_student/', async (req, res) => {
        await Student.find()
        .then((student)=>res.status(200).json(student))
        .catch(error=>res.status(500).json('Failed to fetch student data.'+error))
   });
//    view all tutor 
   app.get('/admins/view_tutor/', async (req, res) => {
    await Tutor.find()
    .then((tutor)=>res.status(200).json(tutor))
    .catch(error=>res.status(500).json('Failed to fetch tutor data.'+error))
});
    
//    view student that is registered for course in the course model 
        app.post('/students/view_register_course/:id', async (req, res) => {
        const {courseObject}=req.body
        const courseId=req.param.id
        Course.findByIdAndUpdate(req.params.id)
        .then((course)=>{course.students.push(courseObject)
            course.save()
            .then(()=>res.json("student regsiter for the course"))
            .catch((error)=>res.json("error"+error))
        })
        .catch((error)=>res.status(400).json("error"+error))
        
        })
    
          
   //generating the student code
   app.post('/student/code/generate',async(req,res)=>{
     const {name,email,studentcode,entrycourseobject,courseId} =req.body
     const studentinfo={name,studentcode}
     const studentC=new Studentcode(
        {
            email,
            studentcode,
            entrycourseobject:entrycourseobject,
        }
        
     )
    await studentC.save()
   .then(()=>{
   Course.findByIdAndUpdate(courseId)
    .then((course)=>{course.student.push(studentinfo)})
    .catch((error)=>res.json("error"+error))
   })
   .catch((error)=>res.json("error"+error))
   })

//    reister student for a course 
   app.post('/courses/student_register/:id',(req,res)=>{
    const{studentObject}=req.body
    Course.findByIdAndUpdate(req.params.id)
    .then((course)=>{course.students.push(studentObject)
        course.save()
        .then(()=>res.json("student register for course"))
        .catch((error)=>res.json("error"+error))
    })
    .catch((error)=>res.status(400).json("error"+error))

   })
//    view 
   app.get('/courses/students/:id', async (req, res) => {
    const courseId = req.params.id;
    try {
      const course = await Course.findById(courseId);
      const students = course.students;
      return res.json({ success: true, students });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error fetching students for the course.', error: error.message });
    }
  });

 
}
  
module.exports={adminUnauthetication,adminAuthetication}