var PORT = 9529;
var http = require('http');
var qs = require('qs');

var server = http.createServer(function (request, response) {
  var query = require('url').parse(request.url).query;
  var params = qs.parse(query);

  response.end(params.echostr);
});

server.listen(PORT);

console.log("Server runing at port: " + PORT + ".");