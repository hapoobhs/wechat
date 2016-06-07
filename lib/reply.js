function replyText(msg){

  //将要返回的消息通过一个简单的tmpl模板（npm install tmpl）返回微信
  var tmpl = require('tmpl');
  var replyTmpl = '<xml>' +
    '<ToUserName><![CDATA[{toUser}]]></ToUserName>' +
    '<FromUserName><![CDATA[{fromUser}]]></FromUserName>' +
    '<CreateTime><![CDATA[{time}]]></CreateTime>' +
    '<MsgType><![CDATA[{type}]]></MsgType>' +
    '<Content><![CDATA[{content}]]></Content>' +
    '</xml>';
  
  var pictureTmpl='<xml>' +
    '<ToUserName><![CDATA[{toUser}]]></ToUserName>' +
    '<FromUserName><![CDATA[{fromUser}]]></FromUserName>' +
    '<CreateTime><![CDATA[{time}]]></CreateTime>' +
    '<MsgType><![CDATA[{type}]]></MsgType>' +
    '<PicUrl><![CDATA[{picUrl}]]></PicUrl>' +
        '<image>'+
        '<MediaId><![CDATA[{MediaId}]]></MediaId>'+
        '</image>'+
    '</xml>';


 var tp='text';
 var ctxt='谢谢您的关注！'
 if(msg.xml.MsgType[0] == 'text'){
     ctxt='谢谢您的关注！'
   }
   else if(msg.xml.MsgType[0] == 'image')
   {
    ctxt='谢谢您的图片！'
   }
    else if(msg.xml.MsgType[0] == 'shortvideo')
   {
    ctxt='谢谢您的小视频！'
   }
    else if(msg.xml.MsgType[0] == 'location')
   {
    ctxt='谢谢您的位置！'
   }
    else if(msg.xml.MsgType[0] == 'voice')
   {
    ctxt='谢谢您的语音！'
   }
  
  return tmpl(replyTmpl, {
    toUser: msg.xml.FromUserName[0],
    fromUser: msg.xml.ToUserName[0],
    type: tp,
    time: Date.now(),
    content: ctxt
  });
}

module.exports = {
	replyText : replyText
};