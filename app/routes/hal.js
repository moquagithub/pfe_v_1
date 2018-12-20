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
const HalPapers = require('../models/hal_papers');
const uuidv5 = require('uuid/v5');


// certificat SSL
let options = {
    key: fs.readFileSync('./../../SSL/server.key'),
    cert: fs.readFileSync('./../../SSL/server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};


/*Solar*/
let SolrNode = require('solr-node');
// Create client
let client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'Papers',
    protocol: 'http',
    debugLevel: 'ERROR' // log4js debug level paramter
});

let serverHttps = https.createServer(options, api);

//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

/******************************************************************/

api.get('/dynamicSearch/:search/:filters/:start/:rows', function (req, res) {
    let search = req.params.search;
    let start = req.params.start;
    let rows = req.params.rows;
    let filters = req.params.filters;
    let onfield = req.params.onfield;


    request.get(
        {
            url: 'https://api.archives-ouvertes.fr/search?q=' + search + '&fl=' + filters + '&start=' + start + '&rows=' + rows + '&wt=json',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            }
        }
        , function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', body); // Print the HTML for the Google homepage.
            if (!error && (JSON.parse(response.body).response.docs + "" !== 'undefined')) {

                let data = JSON.parse(response.body).response.docs.map(doc => ({
                    titre: doc.title_s,

                    autheurs: doc.authFullName_s,

                    institution: doc.instStructName_s,

                    document_url: doc.fileMain_s,

                    year : ""+doc.producedDateY_i
                }));
                res.json(data);

            }
        });
})

api.get('/dataCollecteByAffiliation/:search/:filters/:start/:rows', function (req, res) {
    let search = req.params.search;
    let start = req.params.start;
    let rows = req.params.rows;
    let filters = req.params.filters;

    console.log(search);

    request.get(
        {
            url: 'https://api.archives-ouvertes.fr/search?q=' + search + '&fl=' + filters + '&start=' + start + '&rows=' + rows + '&wt=json',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            }
        }
        , function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', body); // Print the HTML for the Google homepage.
            if (!error && (JSON.parse(response.body).response.docs + "" !== 'undefined')) {

                let data = JSON.parse(response.body).response.docs.map(doc => ({
                    doc_link: "https://hal.archives-ouvertes.fr/" + doc.halId_s,

                    title: doc.title_s,

                    authors: doc.authFullName_s,

                    institutions: doc.instStructName_s,

                    pdf_url: doc.fileMain_s,

                    year : ""+doc.producedDateY_i
                }));
                res.json(data);

            }
        });
})

api.post('/addHalDocuments', function (req, res) {
    let data = req.body.data;

    data.forEach(function (doc) {
        let halData = new HalPapers(doc);
        halData.save(function (err) {
            if (err) {
                console.log("Error:" + err);
                return;
            }
        });
    })

    res.json({
        message: 'Hal docs added successfully !',
    });

})

api.get('/getNumberOfRows/:search/:filters', function (req, res) {
    let search = req.params.search;
    let start = req.params.start;
    let rows = req.params.rows;
    let filters = req.params.filters;

    console.log(search);

    request.get(
        {
            url: 'https://api.archives-ouvertes.fr/search?q=' + search + '&fl=' + filters + '&start=' + 0 + '&rows=' + 0 + '&wt=json',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            }
        }
        , function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', body); // Print the HTML for the Google homepage.
            if (!error && (JSON.parse(response.body).response.docs + "" !== 'undefined')) {

                let data = JSON.parse(response.body).response.numFound;
                res.json(data);

            }
        });
})


/*Ajouter plusieurs documents à Solr*/
api.get('/addPapersDocuments', function (req, res) {

    HalPapers.find({}).select('doc_link pdf_url title authors institutions year').exec(function (err, docs) {
        if (err)
            throw err;
        // Update document to Solr server
        // res.json(docs);
        let data = docs.map(doc => ({
            id: uuidv5(doc.doc_link, uuidv5.URL).replace(/-/g, ""),

            doc_link: doc.doc_link,

            pdf_url: doc.pdf_url,

            title: doc.title,

            authors: doc.authors,

            institutions: doc.institutions,

            year : doc.year,

            source: "hal"
        }));
        // res.json(data);

        let end = 0;

        data.forEach((doc) => {
            client.update(doc, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                end++;
                if (end === data.length) {
                    res.send('Migration ended successfully');
                }
                console.log('Response:', result.responseHeader);
            });
        })
    })
})

/******************************************************************/

serverHttps.listen(3101, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port 3101");
    }
});
