
const Student = require("../Model/Studentmodel");
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const Course=require('../Model/Coursesmodel');
const Studentcode = require("../Model/Studentcodemodel");

const studentUnauthetication=(app)=>{
    app.post('/students/register', async (req, res) => {
        const { name, email, password,studentcode } = req.body
        const studentExit = await Student.findOne({ email });
        if (studentExit) {
            return res.json('student with that email exit')
        }
        else{
          const hashpassword = await bcrypt.hash(password, 10); 
          const newStudent=new Student({
            name,
            password:hashpassword,
            email,
            studentcode
            
          }) 
          newStudent.save()
          .then(()=>res.json('student created succesfully'))
          .catch(error=>res.status(401).json('error'+error))
        }
        
    });
    
    app.post('/students/login',async(req,res)=>{
        const{email,password}=req.body
        const student=await Student.findOne({email})
        console.log(student);
        if (!student) {
            res.json('no student with that email')
    
        } else {
            const isLoginValid=await bcrypt.compare(password,student.password)
            if (isLoginValid) {
                const token = jwt.sign({id:student._id,role:'students'},`${process.env.TOKEN_SECRET_STUDENT}`)
                res.status(200).json({token,studentid:student._id})
            }
           
        }
    })
   
      
}

const studentauthetication=(app)=>{
    app.get('/student/:id',async(req,res)=>{
        const student = await Student.findById(req.params.id) 
        if (!student) {
            res.status(404).json(`no student with that id:${id}`)
        }
        else{
            res.status(200).json(student)
        }
        
    })
    app.delete('/student/:id',(req,res)=>{
        Student.findByIdAndDelete(req.params.id) 
        .then(()=>{
            res.status(200).json("Account deleted")
        })
        .catch((error)=>{
            res.status(404).json(error)
        })
       
    })
    app.put('/student/:id',async(req,res)=>{
        const{email,password}=req.body
        Student.findByIdAndUpdate(
            req.params.id,
            {
                email,
                password:await bcrypt.hash(password,10)
            },
            {
                new:true,
                runValidators:true
            }
            )
        .then(()=>{
                res.status(200).json("ACCOUNT UPDATED SUCCESSFULLY")
            })
        .catch((error)=>{
                res.status(404).json(error)
            })
            
    })

    // view registered courses
    app.get('/students/view_courses', async (req, res) => {
        await Course.find()
        .then((courses)=>res.status(200).json(courses))
        .catch(error=>res.status(500).json('Failed to fetch courses'+error))
    });
    // register courses 
    app.post('/students/course/apply/:id', async (req, res) => {
       const {courseObject}=req.body
    Student.findByIdAndUpdate(req.params.id)
    .then((student)=>{student.courses.push(courseObject)
        student.save()
        .then(()=>{
            res.json("courses regsiter")
            Course.findByIdAndUpdate(courseObject.courseId)
            .then((course)=>{
                course.students.push({name:student.name,studentcode:student.studentcode})
                course.save()
                .then(()=>{
                    res.status(200).json("course updated successfully")
                })
                .catch((error)=>res.status(400).json("error"+error))
            })
            .catch((error)=>res.status(400).json("error"+error))
            
        })
        .catch((error)=>res.json("error"+error))
    })
    .catch((error)=>res.status(400).json("error"+error))
    
    })

    // student onboard 
    app.post('/student/onboard',async(req,res)=>{
    const{email,studentcode}=req.body
    const studentEmail=Student.findOne({email})
    if (!studentEmail) {
        res.status()
    }

    const student=new Student(
        {
            name,
            email,
            studentcode
        }
      )
      await student.save()
      .then(()=>res.status(200).json("student onboard"))
        .catch(error=>res.status(500).json('Failed to fetch student on board'+error))

    })
    
}

module.exports={studentUnauthetication,studentauthetication}


