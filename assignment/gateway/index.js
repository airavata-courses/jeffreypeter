var express = require('express');
var http = require('http');
var fs = require('fs');
var amqp = require('amqplib/callback_api');
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
	var body = JSON.stringify(req);
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
app.post('/test-mq',function (req,res) {
    console.log("IN::test-mq");
    req.body.text = req.body.text + ":InGateway:";
    var msg;

    amqp.connect('amqp://sgatest:L3tm3t38t@149.165.168.247', function(err, conn) {
        // console.log(conn);
        conn.createChannel(function(err, ch) {
            console.log("IN::createChannel");
            var ex = 'sga.job';
            var key = 'job.new';

            var message = JSON.stringify({ msg: msg, text: req.body.text });
            ch.assertExchange(ex, 'topic', {durable: true});
            ch.publish(ex, key, new Buffer(message));
            console.log(" [x] Sent %s:'%s'", key, message);
            msg ="success";
            sendResponse(msg,req.body.text,res);
        });
        setTimeout(function() {
                msg="Check if the MQ Server is up"
                try {
                    conn.close();
                } catch (e){
                    console.log("IN::Exception::"+msg);
                    sendResponse(msg,req.body.text,res);
                }
            }, 500);
    });




});
app.get('/get-mq',function (req,res) {
    console.log("IN::test-mq");
    // req.body.text = req.body.text + ":InGateway:";
    var msg;

    amqp.connect('amqp://sgatest:L3tm3t38t@149.165.168.247', function(err, conn) {
        // console.log(conn);
        /*conn.createChannel(function(err, ch) {
            console.log("IN::createChannel");
            var ex = 'sga.job';
            var key = 'job.completed';
            //ch.assertExchange(ex, 'topic', {durable: true});
            //console.log(ch.assertQueue('sga.gateway.completed'));
            ch.consume(q, function(msg) {
                console.log(" [x] Received %s", msg.content.toString());
            }, {noAck: true});
            conn.close();
           /!* var message = JSON.stringify({ msg: msg, text: req.body.text });
            ch.assertExchange(ex, 'topic', {durable: true});
            ch.publish(ex, key, new Buffer(message));
            console.log(" [x] Sent %s:'%s'", key, message);
            msg ="success";
            sendResponse(msg,req.body.text,res);*!/
        });*/
        conn.createChannel(function(err, ch) {
            var ex = 'sga.job';
            var key = 'job.completed';
            // ch.assertExchange(ex, 'topic', {durable: true});
            //ch.assertQueue('sga.gateway.completed', {durable: true});
            console.log("IN::assertExchange");
            // console.log(ch);
            console.log(ch.get('sga.gateway.completed'),true);
           /* ch.assertQueue('', {exclusive: true}, function(err, q) {
                console.log("IN::assertQueue");
                console.log(' [*] Waiting for logs. To exit press CTRL+C');
                ch.bindQueue(q.queue, ex, key);
                ch.get(q.queue, function(msg) {
                    var msgObj = JSON.parse(msg.content.toString());
                    var text = msgObj.text;
                    console.log(text);
                    conn.close();

                }, {noAck: true});
            });*/
        });
    });
});
function sendResponse(msg,text,res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(JSON.stringify({ msg: msg, text: text }));
}

port = 8000;
app.listen(port);
console.log('Listening at http://localhost:' + port)