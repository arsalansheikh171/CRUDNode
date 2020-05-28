require('./models/db');

const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');

const expressHandlebars = require('express-Handlebars');

const employeeController = require('./controller/employeeController');

var app = express();

//Configuare the midleware

app.use(bodyParser.urlencoded({
extended:true
}));

app.use(bodyParser.json()); //It will converting all the request data to json format

//Configuring app views
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',expressHandlebars({
    extname: 'hbs',
    defaultLayout:'mainLayout',
    layoutsDir:__dirname + '/views/layouts/'
}))

app.set('view engine', 'hbs'); //Successfully configuare the express handlebars



//Configuaring the route for home route

app.get('/',(req,res) => {
res.send("Hello World");
})

app.listen(500,() =>{

    console.log("Server is listening at port 500");
})

app.use('/employee', employeeController);