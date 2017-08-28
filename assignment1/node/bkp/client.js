var thrift = require('thrift');
var ApplicationService = require('./gen-nodejs/ApplicationService');
var ttypes = require('./gen-nodejs/application_types');

var transport = thrift.TBufferedTransport;
var protocol = thrift.TBinaryProtocol;

/*var connection = thrift.createConnection("localhost", 9093, {
  transport : transport,
  protocol : protocol
});*/
var connection = thrift.createConnection("localhost", 9091);
connection.on('error', function(err) {
  console.log(err);
});



// Create a Calculator client with the connection
var client = thrift.createClient(ApplicationService, connection);
client.communicate("test", function(err, response) {
  console.log(response);
  connection.end();
});
/*client.communicate("test",function(err, response) {
  console.log('ping()');
});*/
//console.log(client);