//Parse .env file
    const dotenv = require('dotenv');
    dotenv.config();
//Include express classes
    const express = require('express');
//Instantiate handlers for http and https
    const http = require('http');
//express app instantiation
    const app = express();
    const httpServer = http.createServer(app);
//require custom router implementation for db example app
    const routerGen = require('./router');
//Middleware Definition 
    app.use(express.json());
    routerGen.gen(app);
//End Middleware definition

//Start Server
console.log("Starting up server on ports: "+process.env.PORT);
httpServer.listen(process.env.PORT,() => console.log('Server started listening on port: '+process.env.PORT));