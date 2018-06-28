/*logo划入动画*/
/**
 * 这里需要注意的是
 * 动画队列的问题
 */

//获取元素
var $wrap = $('#wrap');
var $bg = $('#bg');
var $logo = $wrap.find('#logo');
var $goindex = $wrap.find('#goindex');
var $embed = $bg.find('.bg1 embed');
var $swp3 = $wrap.find('#swp3');
var $videoBtn = $wrap.find('#videoBtn');
var $download = $wrap.find('#download');
var $videoBtn = $wrap.find('#videoBtn');
var $video = $wrap.find('.video');
var $videobox = $wrap.find('.video-box');
var $vi_close = $wrap.find('.close');
//新版本详情
var $newinfo = $('#newinfo');
var $in_lis = $newinfo.find('.infolist ul li');
var $title = $newinfo.find('.title');
var $nfolist = $newinfo.find('.nfolist');
//popwindow弹窗
var $popwindow = $('#popwindow');
var $co_lis = $popwindow.find('.content ul li');
var $co_close = $popwindow.find('.content .close');
var $content = $popwindow.find('.content');
var $scroll = $popwindow.find('.scroll');
//next prev 按钮
var $next = $popwindow.find('#next');
var $prev = $popwindow.find('#prev');
var index = 0;
var len = $co_lis.length;
(function(){
	//解决闪屏问题
	setTimeout(function(){
		$embed.css({'opacity':'1'});
	},500);
	
   	swiper($logo,'fadeIn',{'opacity':'1','marginLeft':'0'},1500);
   	swiper($goindex,'fadeIn',{'opacity':'1','marginRight':'30px'},1500);
   	swiper($swp3,'fadeIn',{'opacity':1,'top':'70px'},1500);
   	swiper($videoBtn,'fadeIn',{'opacity':1,'top':'452px'},1000);
   	swiper($download,'fadeIn',{'opacity':1,'top':'610px'},2000);
   	
})();
/*视频播放*/
(function(){
	/*視頻播放按鈕*/
   	$videoBtn.on('click',function(){
   		$video.show();
   		$(document.body).addClass('noScroll');
   		$videobox.fadeIn();
   	});
   	$vi_close.on('click',function(){
   		$video.hide();
   		$(document.body).removeClass('noScroll');
   		$videobox.fadeOut();
   	});
})();
/*新版本情报*/
(function(){
	//自制的滚动条
	//初始化bar的样式
	var arrH = [1435,665,665,665,665,665];
	var $txt = $popwindow.find('.txt');
	var txtH = $txt.height();
	$txt.each(function (index) {
		    var $this = $(this);
		    var $mainTxt = $this.find('.mainTxt');
            var $scroll = $this.find(".scroll"),
                $bar = $this.find(".bar"),
                mainTxtH = $mainTxt.height(),
                barH = txtH*txtH/mainTxtH,
                topMax = txtH - barH,
                topMin = 0;
            $bar.height(barH);
            $bar.on('mousedown',function(e){
            	var $this = $(this);//存储this对象
            	var stop = $this.position().top;//获取距离定位父级top值
            	var sclY = e.clientY;//鼠标点击的位置
            	$(document).mousemove(function(e){
            		var nclY = e.clientY;//获取当前的鼠标位置
            		var ntop = stop + nclY - sclY;//获取当前的top值
            		flag1 = true;
            		//限制top值的大小
            		ntop = Math.min(ntop,topMax);
            		ntop = Math.max(ntop,topMin);

            		$bar.css({'top':ntop});
            		$mainTxt.css({'top':-ntop*mainTxtH/txtH});//根据数学比例
            	}).mouseup(function(){
            		$(this).off('mousemove').off('mouseup');//当鼠标抬起时去除事件绑定
            	});
            	return false;//阻止默认事件
            });
            //鼠标滚轮事件
            $this.mousewheel(function(e,d){
            	var top = $bar.position().top;//重新获取top值
            	if(d>0){//鼠标滚轮往下滚
            		top -= 10;
            	}else{//鼠标滚轮往上滚
            		top += 10;
            	}
            	top = Math.min(top,topMax);
            	top = Math.max(top,topMin);
            	$bar.css({'top':top});
            	$mainTxt.css({'top':-top*mainTxtH/txtH});//根据数学比例
            	return false;//阻止滚轮默认事件
            });
            //$scroll的点击事件
            $scroll.click(function(e){
            	if ( e.target === this ){
                    var sclY = e.clientY;//获取鼠标点击的位置
                    var stop = $(this).offset().top;//获取到文档的top
                    var dtop = $(document).scrollTop();//获取滚动的top值
                    var top = sclY - (stop-dtop) - barH/2;
                    top = Math.min(top,topMax);//限制top的大小值
                    top = Math.max(top,topMin);
                    $bar.stop().animate({'top':top});
                    $mainTxt.stop().animate({'top':-top*mainTxtH/txtH});
                }
                return false;
            });
	});		
	//next prev按钮点击事 件
	$next.on('click',function(){
    count(true);
	});
	$prev.on('click',function(){
		count(false);
	});
  //自动轮播
  var timer = null;
  //鼠标移入时停止轮播
  $content.mouseenter(function(){
    clearInterval(timer);
  });
  //鼠标移除时开始轮播
  $content.mouseleave(function(){
    if($(this).css('display')!=='none'){
      timer = setInterval(autoMove,2000);
    }
    
  })
  //计算index
  function count(b){
    if(b){
      index++;
      index = index % len;
    }else{
      if(index<1)index=len;
      index--;
    }
    $co_lis.eq(index).fadeIn().siblings().hide();
  }
  //自动轮播函数
  function autoMove(){
    count(true);
    console.log(1);
  }
	//点击新版本详情的li
  //循环遍历
  $in_lis.click(function(){
    $content.css('display','block');
    var index = $(this).index();
    $(document.body).addClass('noScroll');
    $popwindow.show();
    $co_lis.eq(index).fadeIn().siblings().hide();
    clearInterval(timer);
    timer = setInterval(autoMove,2000);
  });

  //点击新版本情报
  //关闭按钮
  $co_close.on('click',function(){
    $content.css('display','none');
    $(document.body).removeClass('noScroll');
    $popwindow.fadeOut();
    clearInterval(timer);
  });
	$popwindow.css({'display':'none','opacity':1});
})();
//滚轮的延迟动画
(function(){
  var $game = $('#game');
  var $ga_title = $game.find('.title');
  var $ga_pic = $game.find('.pic');
  var objArr = [];
  init($title,$in_lis,$ga_title,$ga_pic);
  var length = objArr.length;

  $(window).on('scroll',function(){
    var height = $(document).scrollTop() + $(window).height();//获取文档的滚动高和窗口的高度
    for( i=length-1;i>=0;i-- ){//解决性能问题
      var obj = objArr[i];
      if( !obj.ifFalse && height>=obj.oddTop-200 ){
        (function($obj){//产生闭包
          setTimeout(function(){
            $obj.removeClass('hide');
          },$obj.index()%3*200);
          objArr.slice(i,1);//移除队列如果显示了
        })($(obj));
        obj.ifFalse = true;
      }
    }
  });
  function init(){
    for( var i=0,length=arguments.length;i<length;i++ ){
      arguments[i].each(function(){
        var $this = $(this);
        var stop = $this.offset().top;//获取元素的文档高
        //var dtop = $(document).scrollTop();//获取document的滚动高
        this.oddTop = stop;
        this.ifFalse = false;//象征着滚动高度是否达到目标高度
        objArr.push(this);
      });
      //arguments[i].css({'top':80,'opacity':0});//给传进来的每个jquery对象初始化样式
    }

  };
})();
//3D图片切换
(function(){
  var $game = $('#game');
  var $ga_lis = $game.find('.main .pic ul li');
  var $ga_btns = $game.find('.btn').find('a');
  var index = 0;
  var length = $ga_lis.length;
  //3D效果切换是以中间一张图为核心的
  $ga_lis.on('click',function(){
    //先判断的是否点击的是自己
    //如果是自己本身不执行代码
    var $this = $(this);
    if( index!==$this.index() ){
      //获取当前的图片的index值
      index = $this.index();
      //看看点击的是左边图片还是右边图片
      var lIndex = index - 1;
      var rIndex = index + 1;
      //判断是否超出length;
      if( lIndex<0 ){lIndex=length-1}
      if( rIndex>=length ){rIndex=0}
      //初始化样式
      $ga_lis.removeClass('imd left right');
      //给图片添加上样式
      $ga_lis.eq(index).addClass('imd');
      $ga_lis.eq(lIndex).addClass('left');
      $ga_lis.eq(rIndex).addClass('right');
    }
    return false;
  });
  //点击按钮切换图片
  $ga_btns.on('click',function(){
    var $this = $(this);
    //初始化样式
    $ga_lis.removeClass('imd left right');
    if( $this.index() ){
      $ga_lis.eq(index).addClass('left');
      $ga_lis.eq(index-1).addClass('right');
      index = index + 1;
      index = index%length;
      $ga_lis.eq(index).addClass('imd');
    }else{
      $ga_lis.eq(index).addClass('right');
      index--;
      if(index<0)index = length-1;
      $ga_lis.eq(index).addClass('imd');
      $ga_lis.eq(index-1).addClass('left');
      
    }
    
    
  });
})();


