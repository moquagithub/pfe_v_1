const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const https = require('https');
const fs = require('fs');
let config = require('./config');
let server = express();


// certificat SSL
let options = {
    key: fs.readFileSync('./SSL/server.key'),
    cert: fs.readFileSync('./SSL/server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};


let serverHttps = https.createServer(options, server);


server.use(bodyParser.urlencoded({extended : true}));
server.use(bodyParser.json());
server.use(morgan('dev'));

//for rendering static files (css / javascript)
server.use(express.static(__dirname + '/public'));



// let pilote = require('./app/pilote')(server,express);
let solr = require('./app/routes/solr')(server,express);
let pilote = require('./app/pilote')(server,express);
let dataminig = require('./app/routes/datamining')(server,express);

/* /api is the root of our api, means that if we want to access the signup api
* we should type localhost:3000/api/signup */

// server.use('/pilote',pilote);
server.use('/solr',solr);
server.use('/pilote',pilote);
server.use('/datamining',dataminig);

//the parent file of the view pages (Angular routing)
server.use(function(req, res){
    res.sendFile(__dirname + '/public/app/views/index.html');
});


serverHttps.listen(config.port,function(err){
    if(err){
        console.log(err);
    } else{
        console.log("Listening on port 3100");
    }
});




