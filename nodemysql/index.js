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


app.listen('3000', () => {
        console.log("server started on port 3000");
    });