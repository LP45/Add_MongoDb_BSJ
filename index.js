const express = require('express');
const body_parser = require('body-parser');
const mongodb = require('mongodb');

const PORT = 3000;
const app = express();
const mongoClient = mongodb.MongoClient;
const URL = "mongodb://localhost:27017";
// Set the View Engine
app.set('view engine', 'ejs');

// Use body Parser in middle-ware
app.use(body_parser.json());
app.use(body_parser.urlencoded( {extended: true} ));


// Declare any constants or variables here for Database
let db_handler;
const DB_name = "bsj";

app.listen(PORT, () => {
    console.log(`Server Sta\rted on Port: ${PORT}`);

    

    mongoClient.connect(URL,(err,db)=> {
        if (err) {
            console.log("Error" + err)
        }
        else{
            console.log("Connected to the database!" )
            db_handler =  db.db(DB_name)
        }
    });
    // Step 4.
    // Here you should create a connection with your database
    // Upon success, print a message saying "Database Connected"
    // Upon success, you should also connect to the 'bsj' database.
    
});

// From here on, we can start writing our routes

app.get('/', (req, res) => {
    res.render("index");
});


app.get('/jobs', (req, res) => {
    // In Step 7, we will fetch data from Database here and send to jobs.ejs page using an array called all_compaies
   
    db_handler.collection('companies').find({}).toArray( function (err, result) {
        if (err) {
            console.log(err)
        }

        else {
            res.redirect("jobs", {
            // 
            'all_companies' : result,
            
        });
    }console.log(all_companies)
    
    });



});
    
    
    // const all_companies = [];
    // res.render('jobs', {
    //     all_companies:all_companies
    // });


app.post('/add', (req, res) => {
    // This is where you will get a POST request on the '/add' route. 
    // Step 5. Add your logic here to add a new company to the database.
    
    const company_data = req.body;
    const company_id = company_data['company_id'];
    const company_name = company_data['name'];
    const company_des = company_data['description'];
    const company_logo = company_data['logo']; 
    
    const myobj = {
        company_id:company_id,
        companyname:company_name,
        description: company_des,
        logo: company_logo,
    } 
    db_handler.collection('companies').insertOne(myobj, (err, result) =>{
                if (err) {
                    console.log(err)
                }
        
                else {res.redirect("/jobs")
                    console.log("company inserted")
                
            }
    });

    
    
});

mongoClient.connect(URL,(err,db) =>{
    if (err) {
        console.log("error" + err);
    }
    else{
        console.log("You've connected to the database");
        const db_handler = db.db(DB_name)
    }
});


