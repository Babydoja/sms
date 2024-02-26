const { default: mongoose } = require("mongoose");

const superAdminSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required:[true,'add your email'],
            unique:true,
            trim:true,
            match:[ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please enter a valid email']
        },
        password:{
            type:String,
            require:[true,'enter your password'],
            min:[6,'password must be more than 6 characters']
        }
        
    },
    {
        timestamps:true
    }
)
const SuperAdmin=mongoose.model('superadmins',superAdminSchema)
module.exports=SuperAdmin





