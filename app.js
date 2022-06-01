//Parse .env file
    const dotenv = require('dotenv');
    dotenv.config();
//Include express classes
    const express = require('express');
    const expBodyParser = require('body-parser');
    const routerGen = require('./router');

//Instantiate handlers for http and https
const http = require('http');
const https = require('https');
//Read Certificate from filesystem
const fs = require('fs');
//const privateKey = fs.readFileSync(process.env.KEY);
//const certificate = fs.readFileSync(process.env.CERT);
//const credentials = {key: privateKey, cert: certificate};
//express app instantiation
    const app = express();
    const httpServer = http.createServer(app);
    //const httpsServer = https.createServer(credentials, app);
//Middleware Definition 
    app.use(express.json());
    routerGen.gen(app);
//End Middleware definition


//Start Server
console.log("Starting up server on ports: "+process.env.PORT+", "+process.env.PORTSSL);
httpServer.listen(process.env.PORT,() => console.log('Server started listening on port: '+process.env.PORT));
//httpsServer.listen(process.env.PORTSSL,() => console.log('Server started listening on port: '+process.env.PORTSSL));