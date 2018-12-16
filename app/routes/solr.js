const fs = require('fs');
const Experts = require('../models/experts');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/*Solar*/
let SolrNode = require('solr-node');
// Create client
let client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'BigDP',
    protocol: 'http',
    debugLevel: 'ERROR' // log4js debug level paramter
});

module.exports = function (app, express) {
    let api = express.Router();

    //process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    /******************************************************************/

    /*Recherche d'experts dans Solr*/
    api.get('/searchExperts/:search/:byName/:byTag/:byAffiliation', function (req, res) {
        let search = req.params.search.toLowerCase();
        let byName = req.params.byName;
        let byTag = req.params.byTag;
        let byAffiliation = req.params.byAffiliation;

        /*By default we search on tag field*/
        let searchQuery = client.query()
            .q({tag: search})
            .addParams({
                wt: 'json',
                indent: true
            }).rows(1000);

        /*Other cases*/
        if (byName === 'true') {
            console.log('hanaaaaa');
            searchQuery = client.query()
                .q({prof_name: search})
                .addParams({
                    wt: 'json',
                    indent: true
                }).rows(1000);
        }

        if (byAffiliation === 'true') {

            searchQuery = client.query()
                .q({affiliations: search})
                .addParams({
                    wt: 'json',
                    indent: true
                }).rows(1000);
        }
        if (byName === 'true' && byTag === 'true') {
            searchQuery = client.query()
                .q('prof_name: ' + search + ' OR tag: ' + search + '')
                .addParams({
                    wt: 'json',
                    indent: true
                }).rows(1000);
        }
        if (byName === 'true' && byAffiliation === 'true') {
            searchQuery = client.query()
                .q('prof_name: ' + search + ' OR affiliations: ' + search + '')
                .addParams({
                    wt: 'json',
                    indent: true
                }).rows(1000);
        }
        if (byTag === 'true' && byAffiliation === 'true') {
            searchQuery = client.query()
                .q('tag: ' + search + ' OR affiliations: ' + search + '')
                .addParams({
                    wt: 'json',
                    indent: true
                }).rows(1000);
        }
        if (byName === 'true' && byTag === 'true' && byAffiliation === 'true') {
            searchQuery = client.query()
                .q('tag: ' + search + ' OR affiliations: ' + search + ' OR prof_name: ' + search + '')
                .addParams({
                    wt: 'json',
                    indent: true
                }).rows(1000);
        }


        client.search(searchQuery, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            res.json(result.response);
        });

    })

    /*Ajouter plusieurs documents à Solr*/
    api.post('/addExpertsDocuments', function (req, res) {
        /*Create a dynamic connexion to databases*/
        let conn = mongoose.createConnection('mongodb://localhost:27017/'+req.body.nomBD+'',{ useNewUrlParser: true });
        conn.on('error', function(err){
            if(err) throw err;
        });

        conn.on('close', function(){
            console.log('connexion to '+req.body.nomBD+' closed');
        });

        conn.once('open', function callback () {
            console.info('Connected to '+req.body.nomBD+' db successfully');
        });

        let MyModel = conn.model('ExpertsSchema', new Schema({
            _id : String,
            USER_NAME : String,
            USER_URL : String,
            AFFILIATION : String,
            VERIFICATION_ID : String,
            CITATION_TEXT : String,
            TAG_TEXT : String
        },{ collection : 'GeneralProfiles' }));

        /*****************************************/
        MyModel.find({}).select('_id USER_NAME USER_URL AFFILIATION VERIFICATION_ID CITATION_TEXT TAG_TEXT').exec(function (err, docs) {
            if (err)
                throw err;
            // Update document to Solr server
            // res.json(docs);
            let data = docs.map(doc => ({
                id : doc._id,

                prof_name : doc.USER_NAME,

                prof_url : doc.USER_URL,

                affiliations : doc.AFFILIATION,

                verified_id : doc.VERIFICATION_ID,

                citation : doc.CITATION_TEXT,

                tag : doc.TAG_TEXT
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
                        if(end === data.length){
                            conn.close();
                            res.send('Migration ended successfully');

                        }
                       console.log('Response:', result.responseHeader);
                   });
               })
        })
    })

    /******************************************************************/

    return api;
}
