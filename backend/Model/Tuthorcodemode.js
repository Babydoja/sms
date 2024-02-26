const { default: mongoose } = require("mongoose");

const tutorCodeSchema=mongoose.Schema(
    { email:{
        type:String,
        required:[true,'add your email'],
        unique:true,
        trim:true,
        match:[ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please enter a valid email']
    },
    tutorcode:{
        type:String,
        unique:true,
        required:true
    },
    tutorcourse:{
            coursecode:{type:String,required:true}, 
            description:{type:String,required:true}, 
            Title:{type:String,required:true}, 
        }
        
    },
    {
        timestamps:true
    }
)
const Tutorcode=mongoose.model('tutorcodes',tutorCodeSchema)
module.exports=Tutorcode 





