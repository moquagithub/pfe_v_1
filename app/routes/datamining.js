const fs = require('fs');

module.exports = function (app, express) {
    let api = express.Router();

    //process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    /******************************************************************/


    api.post('/data', function (req, res) {

     /*   var MongoClient = require('mongodb').MongoClient;

    // Connection url
        var url = 'mongodb://localhost:27017/test';
    // Connect using MongoClient
        MongoClient.connect(url, function(err, db) {
            // Use the admin database for the operation
            var adminDb = db.admin();
            // List all the available databases
            adminDb.listDatabases(function(err, result) {
                console.log(result.databases);
                db.close();
            });
        });*/

        res.json("ok");

    });


    /******************************************************************/

    return api;
}
