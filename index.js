const express = require('express');

const server = express();

const users = [ 'cavalo','batata', 'jobson'];

server.use(express.json());
//Querry
server.get('/users',(req, res)=>{


    return res.json(users);
})

//MidleWares
function checkUserExist(req,res, next){
    if(!req.body.name){
        return res.status(400).json({error:'Username Required'})
    }
    return next();
}



function checkUserInArray(req,res, next){
    if(!users[req.params.index]){
        return res.status(400).json({error:'Username Required'})
    }
    return next();
}
//CRUD

server.get('/users/:index',checkUserInArray,(req, res)=>{

    const { index } = req.params;

    return res.json(users[index]);
})

server.post('/users',checkUserExist,(req, res)=>{

    const { name } = req.body;

    users.push(name);

    return res.json(users);

});


server.put('/users/:index',checkUserExist,checkUserInArray,(req, res)=>{
    const { index } = req.params;
    const { name } = req.body;

    users[index]= name;

    return res.json(users);

});

server.delete('/users/:index',checkUserInArray,(req, res,)=>{
    const { index } = req.params;
  

    users.splice(index,1);

    return res.json(users);

});

server.listen(3000);
