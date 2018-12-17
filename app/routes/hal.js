const fs = require('fs');
const mongoose = require('mongoose');
const request = require('request');


module.exports = function (app, express) {
    let api = express.Router();

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
                url: 'https://api.archives-ouvertes.fr/search?q='+search+'&fl=title_s,authFullName_s,instStructName_s,fileMain_s&start='+start+'&rows='+rows+'&wt=json',
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

    api.get('/dynamicSearch/:search/:filters/:start/:rows',function (req,res) {
        let search = req.params.search;
        let start = req.params.start;
        let rows = req.params.rows;
        let filters = req.params.filters;
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

    return api;
}
