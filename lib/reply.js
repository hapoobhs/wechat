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
 var ctxt='thanks'
 if(msg.xml.MsgType[0] == 'text'){
     ctxt='thanks'
   }
   else if(msg.xml.MsgType[0] == 'image')
   {
    ctxt='thanks for ur photo'
   }
    else if(msg.xml.MsgType[0] == 'shortvideo')
   {
    ctxt='thanks for ur video'
   }
    else if(msg.xml.MsgType[0] == 'location')
   {
    ctxt='thanks for shairing ur location'
   }
    else if(msg.xml.MsgType[0] == 'voice')
   {
    ctxt='thanks for ur audio'
   }
   
 

return tmpl(replyTmpl, {
    toUser: msg.xml.FromUserName[0],
    fromUser: msg.xml.ToUserName[0],
    type: tp,
    time: Date.now(),
    content: ctxt
 });
}
exports.replyText=replyText;