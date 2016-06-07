function replyText(msg){
/*  if(msg.xml.MsgType[0] !== 'text'){
    return '';
  }*/
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
    replyText = "excuse me?";
  }
  else if(msg.xml.MsgType[0] == 'image'){
    console.log("picture");
    replyText = "辣眼睛";
  }
  else if(msg.xml.MsgType[0] == 'voice'){
    console.log("voice");
    replyText = "你在敲破锣？";
  }
  else if(msg.xml.MsgType[0] == 'shortvideo')
   {
    replyText="丑逼";
   }
    else if(msg.xml.MsgType[0] == 'location')
   {
    replyText="并不care"
   }
  

  return tmpl(replyTmpl, {
    toUser: msg.xml.FromUserName[0],
    fromUser: msg.xml.ToUserName[0],
    type: 'text',
    time: Date.now(),
    content: replyText
  });
}
