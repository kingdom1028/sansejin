// JavaScript Document
 $(function() {         
         var sw = 0; //定义第几个图片
         $('#lunbo .num span').mouseover(function(){
            sw = $('.num span').index(this);  //获取每个图片的下标
            myShow(sw);
        });
        function myShow(e){
            $('.num span').eq(e).addClass('cur').siblings('span').removeClass('cur');
            $('#focusimg ul li').eq(e).stop(true,true).fadeIn().siblings('li').fadeOut();
        }
        //滑入停止动画
        $('#focusimg').hover(function(){
           if(myTime){
               clearInterval(myTime);
              }   
        },function(){
          myTime = setInterval(function(){
            myShow(sw);
            sw++;
            if(sw==5){sw=0}
          },3000);   
        });
        //自动开始
        var myTime = setInterval(function(){
            myShow(sw);
            sw++;
            if(sw==5){sw=0};
        },3000);
		//控制左右
		$('.le').click(function(){
			clearInterval(myTime);
			sw--;
			if(sw<0){sw=4}
			myShow(sw);
			myTime = setInterval(function(){
            myShow(sw);
            sw++;
            if(sw==5){sw=0}
          },3000);
		})
		
		$('.ri').click(function(){
			clearInterval(myTime);
			sw++;
			if(sw>=5){sw=0}
			myShow(sw);
			myTime = setInterval(function(){
            myShow(sw);
            sw++;
            if(sw==5){sw=0}
          },3000);
		})
		
      });