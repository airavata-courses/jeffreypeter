/*var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(7000, function(){
    console.log('Server running on 7000...');
});*/

var http = require('http');
var cors = require('cors');
var connect = require('connect');

var serveStatic = require('serve-static');

var app = connect();

app.use(cors());
app.use(serveStatic(__dirname));

http.createServer(app).listen(7000, function(){
    console.log('Server running on 7000...');
});