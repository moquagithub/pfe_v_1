var key ;
var csv="N";
var mongo ="N";
$("input[type=text]").keyup(function(){
     key = $("#key").val();


});

function collecter() {
    var checkCsv =document.getElementById("csv");
    var checkMongo =document.getElementById("mongo");

    if(checkCsv.checked == true) csv ="Y";
    else csv="N";

    if(checkMongo.checked == true) mongo ="Y";  else mongo="N";

    var rep =true;

      while(rep){ key = key.replace(" ","+");  if(key.indexOf(" ") == -1 ) rep = false; }

    var webService = "http://127.0.0.1:5000/generalINFO/"+key+"/"+csv+"/"+mongo;

    window.open(webService,key,"menubar=yes, status=no, width=50px");



}