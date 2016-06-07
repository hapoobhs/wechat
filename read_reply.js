var PORT = require('./lib/config').wxPort;
var http = require('http');
var qs = require('qs');

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

function replyText(msg){
  if(msg.xml.MsgType[0] !== 'text'){
    return '';
  }
  console.log(msg);

  //将要返回的消息通过一个简单的tmpl模板（npm install tmpl）返回微信
  var tmpl = require('tmpl');
  var replyTmpl = '<xml>' +
    '<ToUserName><![CDATA[{toUser}]]></ToUserName>' +
    '<FromUserName><![CDATA[{fromUser}]]></FromUserName>' +
    '<CreateTime><![CDATA[{time}]]></CreateTime>' +
    '<MsgType><![CDATA[{type}]]></MsgType>' +
    '<Content><![CDATA[{content}]]></Content>' +
    '</xml>';

  var replyText;

  if(msg.xml.MsgType[0] == 'text'){
    replyText = "It's text";
  }
  else if(msg.xml.MsgType[0] == 'image'){
    console.log("picture");
    replyText = "It's a picture"
  }
  else if(msg.xml.MsgType[0] == 'voice'){
    console.log("voice");
    replyText = "It's an audio"
  }


  return tmpl(replyTmpl, {
    toUser: msg.xml.FromUserName[0],
    fromUser: msg.xml.ToUserName[0],
    type: 'text',
    time: Date.now(),
    content: replyText
  });
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
	else{
		var postdata = "";

		request.addListener("data",function(postchunk){
			postdata += postchunk;
		});

		request.addListener("end",function(){
			var parseString = require('xml2js').parseString;

			parseString(postdata,function(err,result){
				if (!err) {
					var res = replyText(result);
					response.end(res);
				}
			});
		});
	}
});

server.listen(PORT);

console.log("Server is running at port:" + PORT + ".");
