const fs = require('fs');
const mongoose = require('mongoose');
const request = require('request');


module.exports = function (app, express) {
    let api = express.Router();

//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

/******************************************************************/

    api.get('/basicSearch/:search',function (req,res) {
        let search = req.params.search;
        request.get(
            {
                url: 'https://api.archives-ouvertes.fr/search?q='+search+'&fl=title_s,authFullName_s,fileMain_s&wt=json',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                }
            }
            , function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                // console.log('body:', body); // Print the HTML for the Google homepage.
                if (!error)
                    res.send(JSON.parse(response.body));
            });
    })
    /******************************************************************/

    return api;
}
