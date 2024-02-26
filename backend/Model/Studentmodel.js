const { default: mongoose} = require("mongoose");
const studentSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Add your name']
        },
        password:{
            type:String,
            require:[true,'enter your password'],
            min:[6,'password must be more than 6 characters']
        },
        email:{
            type:String,
            required:[true,'add your email'],
            unique:true,
            trim:true,
            match:[ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please enter a valid email']
        },
        studentcode:{
            type:String,
            unique:true,
            required:true
        },
        courses: [{
            title:{type:String,required:true},
            description:{type:String,required:true},
            duration:{type:Number,required:true},
            price:{type:Number,required:true}, 
            coursecode:{type:String,required:true},
        }]
    },
   
    {
        timestamps:true
    }
)

const Student=mongoose.model('students',studentSchema)
module.exports=Student