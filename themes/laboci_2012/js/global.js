
// 下拉菜单
$(function(){	
	 $(".nav").children("li:has(ol)").hover(function() {
		 $(this).children("ol").slideDown(100);
		  }, function() {
		 $(this).children("ol").slideUp(200);
	 });
});




/*延迟加载调用*/
$(function() {          
  $(".main img, .topic img").lazyload({
	  placeholder : "../images/grey.gif", 
	  effect : "fadeIn" 
  });
});



// 测试
function test(){
	var weight=false;
	var middle=false;
	var light=false;
	$("input[name='weight']").each(function(){
		if($(this).attr('checked')){
			weight=true;
		}
	});
	$("input[name='middle']").each(function(){
		if($(this).attr('checked')){
			middle=true;
		}
	});
	$("input[name='light']").each(function(){
		if($(this).attr('checked')){
			light=true;
		}
	});
	
	if(weight){
		$('.testResult').html('<p>测试结果为：<strong>重度</strong>卵巢衰老。卵巢细胞失去活力，建议选用<a href="#product_tingjinghuochao"><strong>三色堇停经活巢装</strong></a></p><p align="right"><a href="#product_tingjinghuochao">查看详情>></a></p><p align="center"><a href="#order"><img src="themes/laboci_2012/images/lc2013/testPic.gif" /></a></p>');
	}else if(middle){
		$('.testResult').html('<p>测试结果为：中度卵巢衰老。内分泌失衡，建议选<a href="#product_wanmeinvren"><strong>三色堇完美女人装</strong></a></p><p align="right"><a href="#product_wanmeinvren">查看详情>></a></p><p align="center"><a href="#order"><img src="themes/laboci_2012/images/lc2013/testPic.gif" /></a></p>');
	}else if(light){
		$('.testResult').html('<p>测试结果为：轻度卵巢衰老。为防止继续恶化，建议选用<a href="#product_huifuqingchun"><strong>三色堇恢复青春装</strong></a></p><p align="right"><a href="#product_huifuqingchun">查看详情>></a></p><p align="center"><a href="#order"><img src="themes/laboci_2012/images/lc2013/testPic.gif" /></a></p>');
	}else{
		alert('请选择症状');
		return false;
	}
}


// 案例
$(document).ready(function(){
	$(".blueberry").blueberry();
});

