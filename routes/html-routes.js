const route = require('express').Router();
const path = require('path');

//initial path
route.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
});
//path to get to notes html
route.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

module.exports = route;