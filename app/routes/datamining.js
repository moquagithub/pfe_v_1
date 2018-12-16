const fs = require('fs');
const dbs = require('../models/allDataBase');

module.exports = function (app, express) {
    let api = express.Router();

    //process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    /******************************************************************/
  api.post('/saveNameData', function (req,res) {
        let dbName = new dbs({

            dbname : req.body.dbname
        })

        dbName.save(function (err) {
            if(err) res.send(err);
            else res.json("dbname stored");
        })

  })

   api.get('/alldb',function (req,res) {
       dbs.find({},function (err,dbnames) {

           if (err) {
               res.send(err);
               return;
           }
           res.json(dbnames);
       })

   })

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
