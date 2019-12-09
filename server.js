// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string",function(req,res){
  var date_string = req.params.date_string;
  result(res,date_string);
});

app.get("/api/timestamp/",function(req,res){
  var date_string = new Date();
  result(res,null);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function result(res,date_string){
  try{
    var date;
    if (date_string==null){
      date = new Date();
    }else{
      date = new Date(date_string);
    }
    var unix =  date.getTime();
    var utc = date.toUTCString();
    res.json({unix:unix,utc:utc});
  }catch(error){
    res.json({error:"Invalid Date"});
  }
}