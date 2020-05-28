const express = require('express');

const mongoose = require('mongoose');

//Include The Model Classs

const Employee = mongoose.model('Employee');

const router = express.Router();
//Show Form of addOrEdit View
router.get("/",(req,res) => {
    res.render("employee/addOrEdit.hbs",{
        viewTitle:"Insert Employee"
    })
})

//Handle The Post Request

router.post("/",(req,res) => {


    //Just Check If THe Post is for the creation of the record or the updation

    if(req.body._id == "")
    {
        insertRecord(req,res);
    }
    else
    {
        updateRecord(req,res);
    }


    //Creating Custom Function
    //insertRecord(req,res);
})

function insertRecord(req,res)
{
    var employee = new Employee();

    employee.fullName = req.body.fullName;

    employee.email = req.body.email;

    employee.mobile = req.body.mobile;

    employee.city = req.body.city;


    //Checking For Form Fields Validations

    if(employee.fullName == "" || employee.email == "" || employee.mobile == "" || employee.city == "")
    {
        res.render('employee/addOrEdit',({
            viewTitle:'Insert Employee',
            error:'Enter All Details',
            employee:req.body
        }))
        return;
    }


    employee.save((err,doc) =>{
        //If No Error is there

        if(!err){
            res.redirect('employee/list');
        }
        else{
            if(err.name == "ValidationError"){
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit",({
                    viewTitle:"Insert Employee",
                    employee:req.body
                }))
            }
            //Any Error
            console.log("Error occured during record insertion" + err);
        }
    })
}

//Creating Route For Displaying All Users

router.get('/list',(req,res) => {
    Employee.find((err,docs) => {
        if(!err){
            res.render("employee/list",{
                list:docs
            })
        }
    })
})
//Update Record
router.get('/:_id',(req,res) =>{
    Employee.findById(req.params._id,(err,doc) =>{
        //Check For The Error
        if(!err)
        {
            res.render('employee/addOrEdit',({
                viewTitle:'Update Employee',
                employee:doc
            }))
        }
    })
})

//Delete Record

router.get('/delete/:id',(req,res) => {
    Employee.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err){
            res.redirect('/employee/list');
        }
        else{
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

//Function to handle form fields errors
function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path)
        {
            case 'fullName':
            body['fullNameError'] = err.errors[field].message;
            break;
            case 'email':
            body['emailError'] = err.errors[field].message;
            break;
            default:
                break;
        }
    }
}

function updateRecord(req,res)
{
    Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc) => {
        //If No Error Is There

        if(!err){
            res.redirect('employee/list');
        }
        else{
            //If any Error

            if(err.name == "ValidationError")
            {
                handleValidationError(err,req.body);
                res.render('employee/addOrEdit',({
                    viewTitle:'Update Employee',
                    employee:req.body
                }))
            }
            else
            {
                console.log("Error Occured In Updating in  Records" + err);
            }
        }
    })
}


module.exports = router;
