var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var thrift = require('thrift');
var ApplicationService = require('./gen-nodejs/ApplicationService');
var ttypes = require('./gen-nodejs/application_types');
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Express static files
app.use("/public", express.static(__dirname + '/public'));
app.get('/', function(req, res){
    console.log('GET /')
    //var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
    var html = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

app.post('/test', function(req, res){
    console.log('IN:Nodejs::test /');
    console.log(req.body);
    reqData = req.body;
    req.body.text = req.body.text + ":InNodejs:"
    console.log(req.body.text);
    var transport = thrift.TBufferedTransport;
    var protocol = thrift.TBinaryProtocol;
    var connection = thrift.createConnection("localhost", 9091);
    connection.on('error', function(err) {
        console.log(err);
    });
    var client = thrift.createClient(ApplicationService, connection);
    client.communicate(JSON.stringify(reqData), function(err, response) {
        console.log(response);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(response);
        connection.end();
    });


});

port = 8080;
app.listen(port);
console.log('Listening at http://localhost:' + port)