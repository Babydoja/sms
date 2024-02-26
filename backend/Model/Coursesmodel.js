const { default: mongoose } = require("mongoose");

const courseSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true,
        },
        duration:{
            type:Number,
            required:true,
            min:0
        },
        price:{
            type:Number,
            required:true,
            min:0
        },
        coursecode:{
            type:String,
            required:true
        },
        students:[
            {
                name:{type:String,required:true},
                studentcode:{type:String,required:true}
            }
        ],
       months:[{
            type:String,
            required:true
       }]
    },
    {
        timestamps:true
    }

)

const Course=mongoose.model('courses',courseSchema)
module.exports=Course