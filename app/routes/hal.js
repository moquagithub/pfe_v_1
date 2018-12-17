const express = require('express');
const https = require('https');
const fs = require('fs');
let api = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('request');
api.use(bodyParser.urlencoded({extended: true}));
api.use(bodyParser.json());
api.use(morgan('dev'));

// certificat SSL
let options = {
    key: fs.readFileSync('./../../SSL/server.key'),
    cert: fs.readFileSync('./../../SSL/server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};


let serverHttps = https.createServer(options, api);

//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

/******************************************************************/

    api.get('/basicSearch/:search/:start/:rows',function (req,res) {
        let search = req.params.search;
        let start = req.params.start;
        let rows = req.params.rows;
        request.get(
            {
                url: 'https://api.archives-ouvertes.fr/search?q='+search+'&fl=title_s,authFullName_s,fileMain_s&start='+start+'&rows='+rows+'&wt=json',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                }
            }
            , function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                // console.log('body:', body); // Print the HTML for the Google homepage.
                if (!error){
                    let data = JSON.parse(response.body).response.docs.map(doc => ({
                        titre : doc.title_s,

                        autheurs : doc.authFullName_s,

                        document_url : doc.fileMain_s,
                    }));
                    res.json(data);

                }
            });
    })

    api.get('/advancedSearch/:search/:start/:rows',function (req,res) {
        let search = req.params.search;
        let start = req.params.start;
        let rows = req.params.rows;
        request.get(
            {
                url: 'https://api.archives-ouvertes.fr/search?q="'+search+'"~&fl=title_s,authFullName_s,instStructName_s,fileMain_s&start='+start+'&rows='+rows+'&wt=json',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                }
            }
            , function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                // console.log('body:', body); // Print the HTML for the Google homepage.
                if (!error){
                    let data = JSON.parse(response.body).response.docs.map(doc => ({
                        titre : doc.title_s,

                        autheurs : doc.authFullName_s,

                        institution : doc.instStructName_s,

                        document_url : doc.fileMain_s,
                    }));
                    res.json(data);

                }
            });
    })

    api.get('/dynamicSearch/:onfield/:search/:filters/:start/:rows',function (req,res) {
        let search = req.params.search;
        let start = req.params.start;
        let rows = req.params.rows;
        let filters = req.params.filters;
        let onfield = req.params.onfield;



        request.get(
            {
                url: 'https://api.archives-ouvertes.fr/search?q='+search+'&fl='+filters+'&start='+start+'&rows='+rows+'&wt=json',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                }
            }
            , function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                // console.log('body:', body); // Print the HTML for the Google homepage.
                if (!error){
                    let data = JSON.parse(response.body).response.docs.map(doc => ({
                        titre : doc.title_s,

                        autheurs : doc.authFullName_s,

                        institution : doc.instStructName_s,

                        document_url : doc.fileMain_s,
                    }));
                    res.json(data);

                }
            });
    })
    /******************************************************************/

    serverHttps.listen(3101, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Listening on port 3101");
        }
    });
