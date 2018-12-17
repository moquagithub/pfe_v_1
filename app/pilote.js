let request = require('request');
const fs = require('fs');
module.exports = function (app, express) {
    let api = express.Router();

    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


    /*REQUETES POUR API HAL*******************************************************/

    api.get('/dynamicSearch/:search/:start/:rows',function (req,res) {
        let search = req.params.search;
        let start = req.params.start;
        let rows = req.params.rows;
        let filters = req.params.filters;
        let onfield = req.params.onfield;
        request.get(
            {
                url: 'https://localhost:3101/dynamicSearch/'+onfield+'/'+search+'/title_s,authFullName_s,instStructName_s,fileMain_s/'+start+'/'+rows+'',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                }
            }
            , function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                // console.log('body:', body); // Print the HTML for the Google homepage.
                if (!error){
                    res.json(JSON.parse(response.body));

                }
            });
    })

    /******************************************************************/

    return api;
}