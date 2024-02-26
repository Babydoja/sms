const { default: mongoose,  } = require("mongoose");
const codeSchema = mongoose.Schema(
    {
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
        entrycourseobject:{
            coursecode:{type:String,required:true},
            title:{type:String,required:true},
            description:{type:String,required:true},
            duration:{type:Number,required:true},
            price:{type:Number,required:true}, 
        } 
    }
)

const Studentcode=mongoose.model('studentcodes',codeSchema)
module.exports=Studentcode