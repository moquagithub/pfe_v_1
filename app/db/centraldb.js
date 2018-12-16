/*Create connections to mongodb Databases*/
let config = require('../../config');
let mongoose = require('mongoose');

let dbs = mongoose.createConnection(config.dbs,{ useNewUrlParser: true });

dbs.on('error', function(err){
    if(err) throw err;
});

dbs.once('open', function callback () {
    console.info('Connected to central database  successfully');


});



module.exports = dbs;

mongoose.set('useCreateIndex', true);

