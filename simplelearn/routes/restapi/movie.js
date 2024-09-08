const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let movies = require("../../Movie");
const users = require('../../Users');




//=================================MOVIES======================================\\

//get all the movie properties
router.get('/m', (req, res) => {
    res.json(movies);
});

//get per id 
router.get('/m/:id', (req, res) => {
    const found = movies.some(movie => movie.id === parseInt(req.params.id))

    if(found) {
        res.json(movies.find(movie => movie.id === parseInt(req.params.id)));
    }else{
        res.status(404).json({message: "Movie not found"})
    }
});

//get per id #2
// router.get('/m/:id', (req, res) => {
//     const id = req.params.id;

//     for(let movie of movies) {
//         if(movie.id === id) {
//             res.json(movie)
//             return
//         }
//     }
//     res.status(404).json({message: "Movie not found"})
// })


router.post('/m', (req, res) => {
    const movies = req.body;
    
    console.log(movies);
    movies.push(movies);
    res.send("Movie is added to the list");
    res.json(movies);
});


router.delete('/m/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if(found) {
        users = users.filter((user) => user.id !== parseInt(req.params.id))
        res.json({msg: "User is deleted!",
            users
        });
    }else{
    res.status(404).json({message: "User not found"})
    }
});
// delete per id #2
// router.delete('/m/:id', (req, res) => {
//     const id = req.params.id;
//     const index = movies.findIndex(movie => movie.id === parseInt(id));
//     if(index !== -1) {
//         movies.splice(index, 1);
//         res.json(movies);
//     }else{
//         res.status(404).json({message: "Movie not found"})
//     }
// });

//remove per id in the list #3
// app.delete('/m/:id', (req, res) => {
//     const id = req.params.id

//     movies = movies.filter(movie => {
//         if(movie.id !== id){
//             return true
//         }
//         return false
//     })
//     res.send("Movie is deleted!")
// });


module.exports = router;