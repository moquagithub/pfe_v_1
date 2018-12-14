const fs = require('fs');
const Experts = require('../models/experts');

/*Solar*/
let SolrNode = require('solr-node');
// Create client
let client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'localDocs',
    protocol: 'http',
    debugLevel: 'ERROR' // log4js debug level paramter
});

module.exports = function (app, express) {
    let api = express.Router();

    //process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    /******************************************************************/

    /*Recherche d'experts dans Solr*/
    api.get('/searchExperts/:search', function (req, res) {
        let search = req.params.search.toLowerCase();

        let searchQuery = client.query()
            .q({TAG_TEXT: search})
            .addParams({
                wt: 'json',
                indent: true
            }).rows(1000);

        client.search(searchQuery, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            res.json(result.response);
        });

    })
    
    /*Ajouter plusieurs documents à Solr*/
    api.post('/addExpertsDocuments',function (req,res) {

        // Experts.find({}).select('USER_NAME USER_URL AFFILIATION VERIFICATION_ID CITATION_TEXT TAG_TEXT').exec(function (err,docs) {
        //     if(err)
        //         throw err;
            // Update document to Solr server
            // let data = docs;
        let data = {};
        let key ='content';
        data[key]=[];
         let data1 =
              {
            id : 3242344235,
            USER_NAME: 'hamidjen',
            USER_URL: 'hamidjen.com',
            AFFILIATION: 'hamidjen academy',
            VERIFICATION_ID: 'blabla',
            CITATION_TEXT:'hamidjenotology',
            TAG_TEXT:'expert in hamidjenotology and blablatology'
        };
        let data2 = {
            id : 234234556,
            USER_NAME: 'hamidjen',
            USER_URL: 'hamidjen.com',
            AFFILIATION: 'hamidjen academy',
            VERIFICATION_ID: 'blabla',
            CITATION_TEXT:'trolology',
            TAG_TEXT:'expert in data mining and trolology'
        };
        data[key].push(data1);
        data[key].push(data2);
        console.log(data);
            data.content.forEach((doc)=>{
                client.update(doc, function(err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Response:', result.responseHeader);
                });
            })


        // })



    })

    /******************************************************************/

    return api;
}
