//Parse .env file
    const dotenv = require('dotenv');
    dotenv.config();
//Include express classes
    const express = require('express');
    const expBodyParser = require('body-parser');
    const routerGen = require('./router');
//Instantiate handlers for http and https
    const http = require('http');
//express app instantiation
    const app = express();
    const httpServer = http.createServer(app);
//Middleware Definition 
    app.use(express.json());
    routerGen.gen(app);
//End Middleware definition


//Start Server
console.log("Starting up server on ports: "+process.env.PORT+", "+process.env.PORTSSL);
httpServer.listen(process.env.PORT,() => console.log('Server started listening on port: '+process.env.PORT));