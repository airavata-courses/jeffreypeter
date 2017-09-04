var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
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
	var body = JSON.stringify(req.body);
    console.log(body);
	var options = {
		host: 'localhost',
		port: '8080',
		path: '/test',
		method: 'POST',
		headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
    }
	};

  // Set up the request
	var post_req = http.request(options, function(httpResponse) {
		httpResponse.setEncoding('utf8');
		httpResponse.on('data', function (chunk) {
			console.log('Response: ' + chunk);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(chunk);
		});
	});
	post_req.on('error', function(err) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end("Please check if the Nodejs server is running");
	});
  // post the data
	//post_req.write();
	post_req.end(body);

});


port = 8000;
app.listen(port);
console.log('Listening at http://localhost:' + port)