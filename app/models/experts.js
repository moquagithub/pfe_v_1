let mongoose = require('mongoose');
db = require('../db/db_experts');

let Schema = mongoose.Schema;


/*The Schema*/

let ExpertsSchema = new Schema({
    _id : String,
    USER_NAME : String,
    USER_URL : String,
    AFFILIATION : String,
    VERIFICATION_ID : String,
    CITATION_TEXT : String,
    TAG_TEXT : String
},{ collection : 'GeneralProfiles' });




//exporting model
module.exports = db.model('Experts', ExpertsSchema);