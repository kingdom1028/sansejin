//<![CDATA[
var cmt_empty_username = "请输入您的用户名称！";
var cmt_empty_email = "请输入您的电子邮件地址！";
var cmt_error_email = "电子邮件地址格式不正确！";
var cmt_empty_content = "您没有输入评论的内容！";
var captcha_not_null = "验证码不能为空！";
var cmt_invalid_comments = "无效的评论内容！";

/**
 * 提交评论信息
*/
function submitComment(frm)
{
  var cmt = new Object;
  
  cmt.username        = frm.elements['username'].value;
  cmt.age			  = 0;
  cmt.vocational      = '';
  cmt.content         = frm.elements['contents'].value;
  cmt.type            = frm.elements['cmt_type'].value;
  cmt.id              = frm.elements['id'].value;
  cmt.enabled_captcha = frm.elements['enabled_captcha'] ? frm.elements['enabled_captcha'].value : '0';
  cmt.captcha         = frm.elements['captcha'] ? frm.elements['captcha'].value : '';
  cmt.rank	  		  = $("input[name='rank']:checked").val();

  if (cmt.username.length == 0)
  {
     alert('请输入您的昵称');
	 document.IndexcommentFormf.username.focus();
     return false;
  }

  if (cmt.content.length == 0)
  {
     alert('请填写详细内容');
	 document.IndexcommentForm.content.focus();
     return false;
  }

  if (cmt.enabled_captcha > 0 && cmt.captcha.length == 0 )
  {
     alert(captcha_not_null);
     return false;
  }

   //document.write(cmt.toJSONString());  
   Ajax.call('index_comment.php', 'cmt=' + cmt.toJSONString(), commentResponseIndex, 'POST', 'JSON');
   
   return false;
}

/**
 * 处理提交评论的反馈信息
*/
  function commentResponseIndex(result)
  {

	
    if (result.error == 0)
    {
        alert('提交成功！');
        document.forms['IndexcommentFormf'].reset(); 
		//layer.innerHTML = result.content;
    }else{
	    alert('提交失败！');
	}
  }

/**
 * 提交评论信息
 */
function submitComment_doctor(frm)
{
  var cmt = new Object;
  
  cmt.username        = frm.elements['username'].value;
  cmt.vocational      = '';
  cmt.content         = frm.elements['contents'].value;
  cmt.type            = frm.elements['cmt_type'].value;
  cmt.id              = frm.elements['id'].value;
  cmt.rank            = 0;

  if (cmt.username.length == 0)
  {
     alert('请输入您的昵称');
	 document.commentDoctor.username.focus();
     return false;
  }

  if (cmt.content.length == 0)
  {
     alert('请填写评论内容');
	 document.commentDoctor.content.focus();
     return false;
  }

   //document.write(cmt.toJSONString());  
   Ajax.call('index_comment.php', 'cmt=' + cmt.toJSONString(), commentResponseDoctor, 'POST', 'JSON');
   
   return false;
}


/**
 * 提交评论信息
 */
function submitAsk_doctor(frm)
{
  var cmt = new Object;
  
//  cmt.username        = frm.elements['username'].value;
//  cmt.tel			  = frm.elements['tel'].value;
  cmt.vocational      = '';
  cmt.content         = frm.elements['contents'].value;
  cmt.type            = frm.elements['cmt_type'].value;
  cmt.id              = frm.elements['id'].value;
  cmt.enabled_captcha = frm.elements['enabled_captcha'] ? frm.elements['enabled_captcha'].value : '0';
  cmt.captcha         = frm.elements['captcha'] ? frm.elements['captcha'].value : '';
  cmt.rank            = 0;
  cmt.cmt_value       = 'ask';
/*
  if (cmt.username.length == 0)
  {
     alert('请输入您的昵称');
	 document.commentDoctor.username.focus();
     return false;
  }
  if (cmt.tel.length == 0)
  {
     alert('请输入您的联系电话');
	 document.commentDoctor.tel.focus();
     return false;
  }
*/ 
 if (cmt.content.length == 0)
  {
     alert('请输入咨询内容');
	 document.commentDoctor.content.focus();
     return false;
  }

  if (cmt.enabled_captcha > 0 && cmt.captcha.length == 0 )
  {
     alert(captcha_not_null);
     return false;
  }

   //document.write(cmt.toJSONString());  
   Ajax.call('index_comment.php', 'cmt=' + cmt.toJSONString(), commentResponseDoctor, 'POST', 'JSON');
   
   return false;
}

/**
 * 处理提交评论的反馈信息
*/
  function commentResponseDoctor(result)
  {

	
    if (result.error == 0)
    {
        alert('提交成功！');
        document.forms['IndexcommentFormf'].reset(); 
		//layer.innerHTML = result.content;
    }else{
	    alert('提交失败！');
	}
  }

//]]>

<!--end-->
