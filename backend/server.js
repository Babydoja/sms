const express = require("express");
const app = express(); 
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const PORT = 6000;
const cors=require('cors')
const {studentUnauthetication,studentauthetication} =require('./Routes/studentroute');
const { adminUnauthetication ,adminAuthetication} = require("./Routes/Adminroute");
const { superAdminUnauthetication ,superAdminAauthetication} = require("./Routes/Superadmin");
const { tutorUnauthetication, tutorAauthetication } = require("./Routes/Tutorroute");
const courseauthetication = require("./Routes/Courseroute");
// Middleware
app.use(express.json());
// app.use((req,res,next)=>{
//     console.log(res);
// })


app.use(cors())
studentUnauthetication(app)
studentauthetication(app)
adminUnauthetication(app)
adminAuthetication(app)
superAdminUnauthetication(app)
superAdminAauthetication(app)
tutorUnauthetication(app)
tutorAauthetication(app)
courseauthetication(app)

// Server route
app.get('/', (req, res) => {
    res.send('Server home page');
});

// MongoDB connection and server start
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is now running on port ${PORT}`);
        });
        console.log('DB connected');
    })
    .catch((err) => {
        console.error(err);
    });
