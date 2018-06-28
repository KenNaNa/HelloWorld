/*body滚动条*/
/*首页导航的特效*/
(function(){
	//获取元素
	var $nav = $('#nav');
	var $havehides = $nav.find('.mainList .havehide');
	var $navLis = $nav.find('.mainList li');
	var $ulhide = $nav.find('.ulHide');
	var $hides = $ulhide.find('.hide');
	var $logo = $nav.find('.logo');
	/*logo2*/
	var $logo2 = $('#logo2');
	$logo2.delay(1000).queue(function(){
		swiper($(this),'fadeIn',{'opacity':1,'left':60},1000);
	})
	$(window).on('scroll',s());
	function s(){
		//判断滚动高是否为0
		var top = $(document).scrollTop();
		if(top>=55){
			$nav.addClass('scroll');
			$nav.css({
				'position':'fixed',
				'top':0
			});
			$logo2.css({'transform':'scale(0)'});
			$logo.stop().fadeIn();
		}else{
			$nav.removeClass('scroll');
			$nav.css({
				'position':'static'
			});
			$logo2.css({'transform':'scale(1)'});
			$logo.stop().fadeOut();
		}
		return s;
	}
	$navLis.hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
	$havehides.hover(function(){
		$ulhide.stop().slideDown();
		$nav.addClass('hover');
		$hides.eq($(this).index('.mainList .havehide')).stop().fadeIn();
	},function(){
		$ulhide.stop().slideUp();
		$nav.removeClass('hover');
		$hides.eq($(this).index('.mainList .havehide')).stop().fadeOut();
	});
	$hides.hover(function(){
		$ulhide.stop().slideDown();
		$nav.addClass('hover');
		$havehides.eq($(this).index()).addClass('hover');
		$hides.eq($(this).index()).stop().fadeIn();
	},function(){
		$ulhide.stop().slideUp();
		$nav.removeClass('hover');
		$havehides.eq($(this).index()).removeClass('hover');
		$hides.eq($(this).index()).stop().fadeOut();
	});
})();

/*btn点击按钮角色动画*/
(function(){
	var $role = $('#role');
	var $rol1 = $role.find('.rol1');
	var $rol2 = $role.find('.rol2');
	var $r1_roles = $rol1.find('.role');
	var $r2_roles = $rol2.find('.role');
	var $btn = $role.find('.btn');
	var index = 0;
	$r1_roles.removeClass('hide');
	var show = false;
	$btn.on('click',function(){
		(show)?clearQueue($r2_roles,$r1_roles,'hide',900)
			   :clearQueue($r1_roles,$r2_roles,'hide',900);
		show = !show;
	});
})();
/*slide部分特效*/
(function(){
	var $slide = $('#slide');
	var $left = $slide.find('ul li.left');
	var $close = $slide.find('.close');
	var $right = $slide.find('ul li.right');
	var $download = $slide.find('.download');
	var $shrink = $slide.find('.shrink');
	var $downloadMain = $slide.find('.downloadMain');
	$close.on('click',function(){
		$download.removeClass('stretch');
		$(this).stop().delay(200).queue(function(){
			$shrink.show();
			$downloadMain.hide();
		});
	});
	$shrink.on('click',function(){
		$download.addClass('stretch');
		$(this).hide();
		$downloadMain.show();
	});
	hover_queue($left,'pos');
	hover_queue($right,'pos');
})();
/*content banner部分特效*/
(function(){
	var $content = $('#content');
	var $banner = $content.find('.banner');
	var $pic_ul = $content.find('.banner .pic ul');
	var $pic_lis = $pic_ul.find('li');
	var $tab_lis = $content.find('.banner .tab ul li');
	var index = 0;
	var timer = null;
	var $pic_lis_len = $pic_lis.length;
	var $pic_lis_w = $pic_lis.width();
	$tab_lis.eq(index).addClass('on');
	//自动轮播
	clearInterval(timer);
	timer = setInterval(auto_move,2000);
	$tab_lis.on('mouseenter',function(){
		var index = $(this).index();
		$tab_lis.eq(index).addClass('on').siblings().removeClass('on');
		move_animate($pic_ul,index,{'left':-index*$pic_lis_w},500);
	});
	$banner.hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(auto_move,2000);
	});
	function auto_move(){
		index++;
		index = index%$pic_lis_len;
		$tab_lis.eq(index).addClass('on').siblings().removeClass('on');
		move_animate($pic_ul,index,{'left':-index*$pic_lis_w},500);
	}
})();
/*content inform部分特效*/
(function(){
	var $content = $('#content');
	var $inform_lis = $content.find('.inform .tab ul li');
	var $inform_lis_len = $inform_lis.length;
	var $wrapUl = $content.find('.inform .show .wrapUl');
	var $wrapUl_lis = $wrapUl.find('li');
	var $wrapUl_lis_w = $wrapUl_lis.width();
 	var index = 0;
	$inform_lis.eq(index).addClass('on').siblings().removeClass('on');
	$inform_lis.on('mouseenter',function(){
		index = $(this).index();
		$inform_lis.eq(index).addClass('on').siblings().removeClass('on');
		move_animate($wrapUl,index,{'left':-index*$wrapUl_lis_w},500);
	});
})();
/*character生成*/
(function(){
	var $character = $('#character');
	var $ttitle_tab = $character.find('.sMain .title .tab');
	var $mainList_ul = $character.find('.sMain .showMain .mList .mainList .mUl>ul');
	var index = 0;
	obj_addClass($ttitle_tab,'active',index);
	//生成所有的式神图标
    var count = [
        [0,null],
        [0,null],
        [0,null],
        [0,null],
        [0,null]
    ];//每个对应的计数器
    for (var i = 0,length=shishenData.length; i < length; i++) {
        var index = 0;
        switch ( shishenData[i].level ){
            case "SSR":
                index = 1;
                break;
            case "SR":
                index = 2;
                break;
            case "R":
                index = 3;
                break;
            case "N":
                index = 4;
                break;
        }
        count[0][0] ++;
        count[index][0] ++;
        if ( count[0][0] % 2 ){
            count[0][1] = $("<li class='ssList'></li>");
            $mainList_ul.eq(0).append(count[0][1]);
        }
        if ( count[index][0] % 2 ){
            count[index][1] = $("<li class='ssList'></li>");
            $mainList_ul.eq(index).append(count[index][1]);
        }

        var str = shishenData[i].isNew?"<i class='new'></i>":"";

        $div = $("<div class='shishen'>" +
            "<img src='img/index/content/shishen/"+shishenData[i].id+".png'>" +
            "<p class='cover'><span>"+shishenData[i].name+"</span></p>" +
            str +
            "</div>");
        var $clone = $div.clone();
        count[0][1].append($div);
        count[index][1].append($clone);
    }
})();
/*弑神列表的切换*/
(function(){
	var $character = $('#character');
	var $ttitle_tab = $character.find('.sMain .title .tab');
	var $shishen_tab = $character.find('.sMain .showMain .mList .shishenList .shishenTab ul li.clickBtn');
	var $showMain = $character.find('.showMain');
	var $shishenList = $showMain.find('.shishenList');
	var $mainList = $shishenList.find('.mainList');
	var $mUl = $mainList.find('.mUl');
	var $mUl_w = $mUl.width();
	$shishen_tab.on('click',function(){
		var i = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$mUl.eq(i).show().siblings().hide().each(function(){
			var $this = $(this);
			var $this_ul = $this.children('ul')
			var $mUl_ul_btns = $this.find('.btn');
			var $mUl_ul_lis = $this_ul.children('li');
		    var $mUl_ul_lis_l = Math.ceil($mUl_ul_lis.length/6);
			$this.index = 0;
		    ($this.index!==0)?$mUl_ul_btns.eq(0).show():$mUl_ul_btns.eq(0).hide();
		    ($this.index!==$mUl_ul_lis_l-1)?$mUl_ul_btns.eq(1).show():$mUl_ul_btns.eq(1).hide();
		    $this_ul.css({'marginLeft':0});
		});
	});
	$mUl.each(function(){
		var $this = $(this);
		var $mUl_ul = $this.find('ul');
		var $mUl_ul_lis = $mUl_ul.find('li');
		var $mUl_ul_btns = $this.find('.btn');
		var $mUl_ul_lis_l = Math.ceil($mUl_ul_lis.length/6);

		$this.index = 0;
		($this.index!==0)?$mUl_ul_btns.eq(0).show():$mUl_ul_btns.eq(0).hide();
		($this.index!==$mUl_ul_lis_l-1)?$mUl_ul_btns.eq(1).show():$mUl_ul_btns.eq(1).hide();
		$mUl_ul_btns.on('click',function(){
			var i = $(this).index();
			if(i){
				$this.index++;
				$this.index = $this.index % ($mUl_ul_lis_l);
			}else{
				$this.index--;
				($this.index<0) && ($this.index=0);
			}
			($this.index!==0)?$mUl_ul_btns.eq(0).show():$mUl_ul_btns.eq(0).hide();
			($this.index!==$mUl_ul_lis_l-1)?$mUl_ul_btns.eq(1).show():$mUl_ul_btns.eq(1).hide();
			$mUl_ul.stop().animate({'marginLeft':-$this.index*$mUl_w},300);
		});
	});
})();
/*主角列表的切换*/
(function(){
	var $character = $('#character');
	var $title_tab = $character.find('.sMain .title .tab');
	var $showMain_lis = $character.find('.sMain .showMain .mList .mLi');
	var $zhujueList_li = $showMain_lis.eq(1);
	var $zhujueList_li_tab_lis = $zhujueList_li.find('.tab ul li');
	var $pic_ul_lis = $zhujueList_li.find('.pic ul li');
	$title_tab.on('click',function(){
		var index = $(this).index();
		$title_tab.eq(index).addClass('active').siblings('.sMain .title .tab').removeClass('active');
		if(index===2){
			$showMain_lis.eq(0).stop().fadeIn().siblings('.sMain .showMain .mList .mLi').stop().fadeOut();
		}
		if(index===4){
			$showMain_lis.eq(1).stop().fadeIn().siblings('.sMain .showMain .mList .mLi').stop().fadeOut();
		}
	});
	$zhujueList_li_tab_lis.on('click',function(){
		var index = $(this).index();
		$(this).addClass('active').siblings('.sMain .showMain .mList .tab ul li').removeClass('active');
		$pic_ul_lis.eq(index).stop().fadeIn().siblings('.sMain .showMain .mList .pic ul li').stop().fadeOut();
	});
})();
/*strategy攻略轮播部分*/
(function(){
	var $strategy = $('#strategy');
	var $bMain_banner = $strategy.find('.bMain .banner');
	var $bMain_pic_ul = $strategy.find('.bMain .banner .pic ul');
	var $bMain_pic_lis = $strategy.find('.bMain .banner .pic ul li');
	var $bMain_tab_lis = $strategy.find('.bMain .banner .tab ul li');
	var $bMain_pic_lis_w = $bMain_pic_lis.width();
	var $bMain_tab_lis_len = $bMain_tab_lis.length;
	var timer = null;
	var index = 0;
	clearInterval(timer);
	timer = setInterval(auto_move,2000);
	$bMain_tab_lis.on('mouseenter',function(){
		var index = $(this).index();
		$(this).addClass('on').siblings('.bMain .banner .tab ul li').removeClass('on');
		$bMain_pic_ul.animate({'left':-index*$bMain_pic_lis_w},300);
	});
	$bMain_banner.hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(auto_move,2000);
	});
	function auto_move(){
		index++;
		index = index%$bMain_tab_lis_len;
		$bMain_tab_lis.eq(index).addClass('on').siblings().removeClass('on');
		move_animate($bMain_pic_ul,index,{'left':-index*$bMain_pic_lis_w},500);
	}
})();
/*strategy攻略轮播部分*/
(function(){
	var $strategy = $('#strategy');
	var $rightPart_title_tab = $strategy.find('.rightPart .title .tab');
	var $mContent = $strategy.find('.mContent');
	var $mContent_show = $mContent.find('.show');
	$ul = $strategy.find(".mContent ul");
	var $ul_w = $ul.width();
	$rightPart_title_tab.on('mouseenter',function(){
		$(this).addClass('on').siblings('.rightPart .title .tab').removeClass('on');
		var index = Math.floor($(this).index()/2);
		move_animate($mContent_show,index,{'left':-index*$ul_w},500);
	});
	//右侧选项卡内容生产
    var typeArr = ["新手" , "式神" , "斗技" , "玩法" , "高阶" , "御魂"];
    $ul.each(function (i) {
        var num = 0;
        for (var j = 0,length = strateData.length; j < length; j++) {
            var data = strateData[j],
                reg = new RegExp(i-1);
            if ( !i || reg.test(data.type) ){
                var index = !i?data.type.charAt(data.type.length-1):i-1;
                $(this).append('<li>' +
                    '<a href="">' +
                        '<i></i> ' +
                        '<p class="mTitle">【<span class="type">'+typeArr[index]+'</span>】&nbsp;'+data.title+'</p> ' +
                        '<p class="author">作者：<span>'+data.author+'</span></p>' +
                    '</a>' +
                '</li>');
            }
        }
    });
})();
/*fan图片生成*/
(function(){
	var $fan = $('#fan');
	var $mFan_show = $fan.find('.mFan .show'); 
	var length = 6;//有6列
	for( var i=0;i<length;i++ ){
		var $mFan_show_ul = $('<ul></ul>');
		for(var j=i*8;j<(i+1)*8;j++){
			$mFan_show_ul.append('<li>\
                <div class="pic">\
                    <img src="'+fanData[j].url+'" alt="">\
                    <span><b></b></span>\
                </div>\
                <p class="sTitle">'+fanData[j].title+'</p>\
            </li>');
		}
		$mFan_show.append($mFan_show_ul);
	}
})();
/*fan部分轮播*/
(function(){
	var $fan = $('#fan');
	var $tab_tabNav_ul_lis = $fan.find('.tab .tabNav ul li');
	var $mFan_show = $fan.find('.mFan .show');
	var $mFan_show_uls = $mFan_show.find('ul');
	var $mFan_show_uls_w = $mFan_show_uls.width();
	var index = 0;
	$tab_tabNav_ul_lis.eq(index).addClass('on').siblings().removeClass('on');
	$tab_tabNav_ul_lis.on('mouseenter',function(){
		$(this).addClass('on').siblings().removeClass('on');
		index = $(this).index();
		move_animate($mFan_show,index,{'left':-index*$mFan_show_uls_w},500);
	});
})();
/*返回顶部*/
(function(){
	var $goTop = $('#contact').find('.goTop');
	$goTop.on('click',function(){
		$('html,body').animate({
			scrollTop:0
		},300);
	});
})();