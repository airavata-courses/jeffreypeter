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
    console.log('IN:Nodejs::test');
	console.log("Request::");
    console.log(req.body);
    reqData = req.body;
    req.body.text = req.body.text + ":InNodejs:"
    console.log(req.body.text);
    var transport = thrift.TBufferedTransport;
    var protocol = thrift.TBinaryProtocol;
    var connection = thrift.createConnection("localhost", 9091);
    connection.on('error', function(err) {
        console.log("Response::");
		console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});		
        res.end(JSON.stringify({ msg: 'Please check if Python sever is running', text: req.body.text }));
		connection.end();
    });
    var client = thrift.createClient(ApplicationService, connection);
	console.log("communicating with::Python Server")
    client.communicate(JSON.stringify(reqData), function(err, response) {
		console.log("Response::");
        console.log(response);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(response);
        connection.end();
    });


});

port = 8080;
app.listen(port);
console.log('Listening at http://localhost:' + port)

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://sgatest:L3tm3t38t@149.165.168.247', function(err, conn) {

    conn.createChannel(function(err, ch) {
        var ex = 'sga.job';
        var key='job.new';
        ch.assertExchange(ex, 'topic', {durable: true});
        console.log("IN::assertExchange");
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            console.log("IN::assertQueue");
            console.log(' [*] Waiting for logs. To exit press CTRL+C');
            ch.bindQueue(q.queue, ex, key);
            ch.consume(q.queue, function(msg) {
                var msgObj = JSON.parse(msg.content.toString());
                var text = msgObj.text+":InNodejs";
                console.log(text);
                postPython(text);

            }, {noAck: true});
        });
    });
    function postPython(text) {
        console.log("IN::NodeJs");
        conn.createChannel(function(err, ch) {
            var q = 'sga.simple.python';
            ch.assertQueue(q, {durable: false});
            var message = JSON.stringify({ text:text });
            ch.sendToQueue(q, new Buffer(message));
            console.log(" [x] Sent message ::"+message);
        });
    }

});
