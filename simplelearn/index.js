const express = require('express');
//import express from 'express';
const app = express();

// const port = 3000; [port]

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', require('./routes/api/users'));
app.use('/restapi/movie', require('./routes/restapi/movie'));


app.get('/', (req, res) => {
    res.send('Hello There')
})

// app.listen(port, () => console.log(`Server is listening ${port}`)); [port]

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})