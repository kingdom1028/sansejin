/* $Id : shopping_flow.js 4865 2011-07-18  */
var consignee_not_null =  "(必填) 请填写收货人姓名";
var tel_or_mobile_not_null = "手机和固定电话请至少填写一项";  
var tel_notice = "区号与电话号码须同时填写";
var tel_invaild = "区号与电话号码须使用数字填写";
var mobile_invaild  = "手机须使用数字填写";
var country_not_null = "请选择国家";
var province_not_null = "请选择省份/直辖市";
var city_not_null  =  "请选择城市";
var district_not_null = "请选择区域";
var address_not_null = "请填写详细地址";
var pay_not_null = "请选择支付方式";
var bonus_sn_error =  "短信优惠卷号格式不对，请确定后再输入!";  
/* *
 * 检查收货地址信息表单中填写的内容
 */
function checkConsignee(frm)
{
  var msg = new Array();
  var err = false;	
  if (Utils.isEmpty(frm.elements['consignee'].value))
  {
	document.getElementById('consignee_notice').innerHTML = consignee_not_null;
    err = true;
    return false;
//    msg.push(consignee_not_null);
  }
  else
  {
	document.getElementById('consignee_notice').innerHTML = "";
  }	


  if( Utils.isEmpty(frm.elements['mobile'].value) && (Utils.isEmpty(frm.elements['tel_0'].value) || Utils.isEmpty(frm.elements['tel_1'].value)))
  {
	  document.getElementById('mobile_notice').innerHTML = tel_or_mobile_not_null;
	  err = true;
	  return false;
  }		
  else
  {  document.getElementById('mobile_notice').innerHTML = ''; }
  
  if((!Utils.isEmpty(frm.elements['tel_0'].value) && Utils.isEmpty(frm.elements['tel_1'].value)) || (!Utils.isEmpty(frm.elements['tel_1'].value) && Utils.isEmpty(frm.elements['tel_0'].value)))
  {
	  document.getElementById('tel_notice').innerHTML = tel_notice;
	  err = true;   
	  return false;
  }
  if((frm.elements['tel_0'] && frm.elements['tel_0'].value.length > 0 && (!Utils.isTel(frm.elements['tel_0'].value))) || (frm.elements['tel_1'] && frm.elements['tel_1'].value.length > 0 && (!Utils.isTel(frm.elements['tel_1'].value))))
  {
	  document.getElementById('tel_notice').innerHTML = tel_invaild;
	  err = true;
	  return false;
  }
  if (frm.elements['mobile'].value.length > 0)
  {
    var reg = /^[\d|\-|\s]+$/;
    if (!reg.test(frm.elements['mobile'].value))
    {
       document.getElementById('mobile_notice').innerHTML = mobile_invaild;
       err = true;
	   return false;
    }
  }
  
  if (frm.elements['country'] && frm.elements['country'].value == 0)
  {
	document.getElementById('flow_notice').innertHTML = country_not_null;
    err = true;
	return false;
  }
  if (frm.elements['province'] && frm.elements['province'].value == 0 && frm.elements['province'].length > 1)
  {
	document.getElementById('flow_notice').innerHTML = province_not_null;
    err = true;
	return false;  
  }

  if (frm.elements['city'] && frm.elements['city'].value == 0 && frm.elements['city'].length > 1)
  {
	document.getElementById('flow_notice').innerHTML = city_not_null;
    err = true;
	return false;  
  }

  if (frm.elements['selDistricts_0'] && frm.elements['selDistricts_0'].length > 1)
  {
    if (frm.elements['selDistricts_0'].value == 0)
    {
      err = true;
	  document.getElementById('flow_notice').innerHTML = district_not_null;
	  return false;  
//      msg.push(district_not_null);
    }
	else
	  {
		  document.getElementById('flow_notice').innerHTML = "";
	  }
	
  }
  
  if (frm.elements['address'] && Utils.isEmpty(frm.elements['address'].value))
  {
	  document.getElementById('address_notice').innerHTML = address_not_null;
      err = true;
	  return false;  
  }
  else
  {
	  document.getElementById('address_notice').innerHTML = "";
  }
  
  var pay_id = $("input[name='pay_id']:checked").val();	
  if (typeof(pay_id) == 'undefined' || pay_id < 1)
  {
	document.getElementById('pay_id_notice').innerHTML = pay_not_null;
    err = true;
	return false;  
  }
  
  
  	var arr = new Object;
	arr.consignee     = $("#consignee").val();
	arr.mobile        = $("#mobile").val();  
	if ((frm.elements['tel_0'].value == '') && (frm.elements['tel_1'].value == '')) 
	{ arr.tel         = ''; }	
	else
	{ arr.tel         = frm.elements['tel_0'].value+ '-' + frm.elements['tel_1'].value; }
	arr.country       = frm.elements['country'].value;
	arr.province      = frm.elements['province'].value; 
	arr.city          = frm.elements['city'].value;
	arr.district      = frm.elements['district'].value; 
    arr.address       = $("#address").val();
	//arr.coupon_sn	  = frm.elements['coupon_sn'].value;
	arr.pay_id        = pay_id;
	arr.postscript    = $("#postscript").val();
  arr.order_prevent_refresh = frm.elements['order_prevent_refresh'].value;

  	var res = Ajax.call('/shopping.php?act=done', 'arr=' + arr.toJSONString(), null, "POST", "JSON", false);
	if (!res)
	{			
		res.error = 1;
		alert('连接失败，请联系客服！');
		return false;
	}
		
	if (res.message)
	{
	    alert(res.message);
	}
	if (res.error == 1)
	{
		return false;
	}

	//$("#order_form").html(res.content);
	if(res.reurl) 
	{	   
        $("#order_form").html(res.content);//更新购物车列表
	}
	return false;
}
