const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/crud";

//Connect method of mongoose

mongoose.connect(url,{useNewUrlParser:true},(err) =>{
    if(!err){
        console.log("Connection Created Successfully");
    }
    else{
        //If error in connecting DB
        console.log("Error Connecting DB" + err);
    }
})

//Include the employee Model

require('./employee.model');