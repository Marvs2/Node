const express = require('express');
const mysql = require('mysql');

// Create connection 
const db = mysql.createConnection({
    host: "localhost", // 1
    user: "root", // 1
    password: "", // 1
    port: 3307, // 1 Specify the correct port // 3306 is default but mine is 3307
    database: "nodemysql", // 2 if the /createdb is being created
});

//connect to Mysql
db.connect((err) => {
    if(err) {
        //throw err;
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log("Mysql connected");
});

const app = express();

// create database
app.get('/createdb', (req, res) => {
    let sql = 'Create database nodemysql'
    db.query(sql, (err) => {
        if(err) {
            //throw err
            console.error('Error creating database:', err.message);
            return res.status(500).send('Failed to create database');
        }
        res.send('Database Created');
    });
});

// create table in database
app.get('/createemployee', (req, res) => {
    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err) => {
        if(err){
            throw err
        }
        res.send('Employee table created');
    })
})

//Insert a new employee first 
app.get('/employee1', (req, res) => {
    let post = {name: 'Jake Smith', designation: 'Chief Executive Officer'}
    let sql = 'INSERT INTO employee SET ?'
    let query = db.query(sql, post ,err => {
        if(err){
            throw err
        }
        res.send('Employee table created');
    })
})

//fetch all the employees from the database
app.get('/getemployee', (req, res) => {
    let sql = 'SELECT * FROM employee'
    let query = db.query(sql, (err, results) => {
        if(err){
            throw err
        }
        console.log(results)
        res.send('Employee details fetched');
    })
})


//update the details of emplyee based on Id
app.get('/updateemployee/:id',(req, res) => {
    let newName = 'Updated name'
    let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`
    let query = db.query(sql, err => {
        if (err){
            throw err
        }
        req.send('Employee details updated successfully');
    })
})

app.listen('3000', () => {
        console.log("server started on port 3000");
    });