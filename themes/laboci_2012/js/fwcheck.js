/*防伪查询处理请求
*Create By:penghui
*Create Date:2012-08-20
*Version:1.0.0.3
*/
function DoQuery(txtCode)
{
 		var userurl="http://203.93.236.250/NewWebSrvCheckAddr/userip.ashx?jsoncallback=?";
             $.ajax({
               type: "GET",
                url: userurl,
                dataType: "jsonp",
                timeout:3000, 
                beforeSend:function(XMLHttpRequest){
                          $("#btnQuery").attr("disable",true);
                   },
                complete: function(XMLHttpRequest, textStatus){
                       $.unblockUI();
                    },
                success : function(json){
                          GetFwMSgData(txtCode,json.ipaddr);
                          $("#btnQuery").attr("disable",false);
                   },
                error : function(){
                       $.unblockUI();
					   $.growlUI('信息提示', '请求数据时发生错误!');
                      $("#btnQuery").attr("disable",false);
                }
               
            }); 
}
 function GetFwMSgData(codedata,ipdata)
    {
       if(codedata=="")
       {
            alert("请输入防伪码!");
            return false;
       }
        var clientUrl = "http://wsu.t3315.com/NewWebSrvCheckAddr/FWResult.aspx?jsoncallback=?";
    	var QueryData = { FwCode: codedata, IpAddr: ipdata, MD5: "V8JfLlQAUs+OMUDvqTY7ySQ7OLbQ0TiK" };
        $.ajax({
               type: "GET",
                url: clientUrl,
                dataType: "jsonp",
                data : QueryData,
                timeout:30000,
                beforeSend:function(XMLHttpRequest){
                     $.blockUI({ message: '<h3>查询中,请稍后...</h3>'});
                   },
                complete: function(XMLHttpRequest, textStatus){
                       $.unblockUI();
                    },
                success : OnSuccess,
                error : OnError
            });
    }
        function OnSuccess(json) {
			  var html = "<h2 style=\"font-weight:bold;font-size:14px\">防伪查询结果</h2><div style=\"padding:4px;width:600px; color:red;\">查询结果:"+json.FwResult+"</div>";
              $("#data").html(html);
        }
        function OnError(XMLHttpRequest, textStatus, errorThrown) {
        
             $.unblockUI();
		    $.growlUI('信息提示', '请求数据时发生错误!');
            if (errorThrown || textStatus == "error" || textStatus == "parsererror" || textStatus == "notmodified") {
             
              $.growlUI('信息提示', '请求数据时发生错误!');
                return;
            }
            if (textStatus == "timeout") {
                 $.growlUI('信息提示', '请求数据超时!');
                return;
            }
        }