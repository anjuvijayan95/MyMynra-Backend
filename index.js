//import express
const express = require('express')

//import cors
const cors=require('cors')

//import dataService
const dataService=require('./service/dataService')

//create server
const server = express()

//create a port number for server 
server.listen(3000,()=>{
    //to check is server is running
    console.log('server running at 3000');
})

//connecting ports with cors
server.use(cors({
    origin:'http://localhost:4200'
}))

//convert json data to the form that js can understand
server.use(express.json())




//create api call to resolve the register req that coming from regiterServ in service
server.post('/register',(req,res)=>{
    console.log('inside index.js resolver-register');
    console.log(req.body);
    dataService.register(req.body.uname,req.body.mobile,req.body.pswd,req.body.address)
    .then((result)=>{
        console.log(result);
        res.status(result.statusCode).json(result)
    })
    // res.send('register req recived')
})


//create api call to resolve the login req that coming from loginServ in service
server.post('/login',(req,res)=>{
    console.log('inside index.js resolver-login');
    console.log(req.body);
    dataService.login(req.body.mobile,req.body.pswd)
    .then((result)=>{
        console.log(result);
        res.status(result.statusCode).json(result)
    })
    // res.send('register req recived')
})



//create api call to get all products that coming from proServ in service
server.get('/allProducts',(req,res)=>{
    console.log('inside index.js resolver-all products');
    dataService.allProducts()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})


//create api call to get particular products that coming from viewProServ in service
server.get('/view-products/:proId',(req,res)=>{
    dataService.viewProduct(req.params.proId)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})


//api call to get particular brand producs
// server.get('/brand',(req,res)=>{
//     console.log('inside index.js resolver-brand producs');
//     dataService.brandProducts()
//     .then((result)=>{
//         res.status(result.statusCode).json(result)
//     })
// })


server.get('/brands',(req,res)=>{
    console.log('inside index.js resolver-brand producs');
    dataService.brands()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})


server.post('/add-to-wishlist',(req,res)=>{
    console.log('inside index.js resolver-add to wishlist');
    dataService.addtowishlist(req.body)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})


server.get('/get-wishlist',(req,res)=>{
    console.log('inside index.js resolver-get wishlist');
    dataService.getwishlist()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

server.delete('/wishlist-delete/:proId',(req,res)=>{
    console.log('inside index.js resolver-delete wishlist');
    dataService.deletewishlist(req.params.proId)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})


