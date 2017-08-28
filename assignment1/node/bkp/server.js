var thrift = require("thrift");
var ApplicationService = require("./gen-nodejs/ApplicationService");
var ttypes = require("./gen-nodejs/application_types");


var server = thrift.createServer(ApplicationService, {

  communicate: function(input, result) {
    console.log(input);
    result(null,'testing node');
  }

});

server.listen(9093);