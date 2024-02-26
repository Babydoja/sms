const { default: mongoose } = require("mongoose");

const adminCodeSchema=mongoose.Schema(
    { email:{
        type:String,
        required:[true,'add your email'],
        unique:true,
        trim:true,
        match:[ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please enter a valid email']
    },
    admincode:{
        type:String,
        unique:true,
        required:true
    }    
    },
    {
        timestamps:true
    }
)
const Admincode=mongoose.model('admincodes',adminCodeSchema)
module.exports=Admincode 





