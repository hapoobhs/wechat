var PORT = require('./lib/config').wxPort;

var http = require('http');
var qs = require('qs');

var wss = require('./lib/ws.js').wss;
var replyText = require('./lib/reply').replyText; 

var TOKEN = 'hahaha';

function checkSignature(params, token){
  //1. 将token、timestamp、nonce三个参数进行字典序排序
  //2. 将三个参数字符串拼接成一个字符串进行sha1加密
  //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信

  var key = [token, params.timestamp, params.nonce].sort().join('');
  var sha1 = require('crypto').createHash('sha1');
  sha1.update(key);

  return  sha1.digest('hex') == params.signature;
}

var server  = http.createServer(function(request, response){
	 var query = require('url').parse(request.url).query;
  	 var params = qs.parse(query);


	if(!checkSignature(params, TOKEN)){
		response.end('signature fail');
		return;
	}

	if (request.method == 'GET') {
		response.end(params.echostr);
	}

	//POST
	else{
		var postdata = "";

		request.addListener("data",function(postchunk){
			postdata += postchunk;
		});

		request.addListener("end",function(){
			var parseString = require('xml2js').parseString;

			parseString(postdata, function (err, result) {
        if(!err){
          /*if(result.xml.MsgType[0] === 'text'){
            //将消息通过websocket广播
            wss.broadcast(result);
            var res = replyText(result);
            response.end(res);
          }*/
          wss.broadcast(result);
          var res = replyText(result);
          response.end(res);
        }
      });
	});
	}
});

server.listen(PORT);

console.log("Server is running at port:" + PORT + ".");

var express = require('express');
var app = express();
app.get('/index',function(req,res){
    var options = {
        root:__dirname,
        headers:{
            'Upgrade':'websocket'
        }
    };
    res.sendFile('/index.html',options);
});
app.listen(80);

console.log("Weixin server runing at port: " + PORT + ".");
