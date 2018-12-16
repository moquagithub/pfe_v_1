let mongoose = require('mongoose');
db = require('../db/centraldb');

let Schema = mongoose.Schema;


/*The Schema*/

let dbs = new Schema({
    dbname : {type : String, required: true, index: {unique:true }}
},{ collection : 'databasename' });




//exporting model
module.exports = db.model('databasename', dbs);