let mongoose = require('mongoose');
db = require('../db/hal_papers_db');

let Schema = mongoose.Schema;


/*The Schema*/

let HalPapersSchema = new Schema({
    doc_link : { type : String, index :{unique:true}, required: true},
    pdf_url : { type : String},
    title : { type : String, required: true},
    authors : { type : Array, default:[] , required: true},
    institutions : {type:Array, default:[] ,required:true},
    year : {type : String}
},{ collection : 'HalPapers' });



//exporting model
module.exports = db.model('HalPapers', HalPapersSchema);