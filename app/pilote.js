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
        request.get(
            {
                url: 'https://localhost:3101/dynamicSearch/'+search+'/title_s,authFullName_s,instStructName_s,fileMain_s,producedDateY_i/'+start+'/'+rows+'',
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

    /*collecte la data depuis HAL*/
    api.get('/dataCollecteByAffiliation/:search/:start/:rows',function (req,res) {
        let search = req.params.search;
        let start = req.params.start;
        let rows = req.params.rows;
        request.get(
            {
                url: 'https://localhost:3101/dataCollecteByAffiliation/instStructName_t:'+search+'/title_s,authFullName_s,fileMain_s,halId_s,instStructName_s,producedDateY_i/'+start+'/'+rows+'',
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

    /*Ajoute la data à la base de données hal_papers_db*/
    api.post('/addHalDocuments',function (req,res) {
        let search = req.params.search;
        let start = req.params.start;
        let rows = req.params.rows;
        console.log(req.body);
        request.post(
            {
                url: 'https://localhost:3101/addHalDocuments',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                },
                form : {
                    data : req.body
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

    /*Nous informe sur le nombre de documents trouvés*/
    api.get('/getNumberOfRows/:search',function (req,res) {
        let search = req.params.search;
        let start = req.params.start;
        let rows = req.params.rows;
        request.get(
            {
                url: 'https://localhost:3101/getNumberOfRows/instStructName_t:'+search+'/title_s,authFullName_s,fileMain_s,halId_s,instStructName_s',
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