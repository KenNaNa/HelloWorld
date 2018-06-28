function show_hide(obj,cName){
	console.log(1);
	if(!obj&&(typeof obj!=='object'))return;
	if('obj'==='$navLis'){
		obj.hover(function(){
			$(this).addClass(cName);
		},function(){
			$(this).removeClass(cName);
		});
	}
	if('obj'==='$havehides'){
		obj.hover(function(){
			$ulhide.stop().slideDown();
			$nav.addClass(cName);
			$hides.eq($(this).index('.mainList .havehide')).stop().fadeIn();
		},function(){
			$ulhide.stop().slideUp();
			$nav.removeClass(cName);
			$hides.eq($(this).index('.mainList .havehide')).stop().fadeOut();
		});
	}
		if('obj'==='$hides'){
			obj.hover(function(){
				$ulhide.stop().slideDown();
				$nav.addClass(cName);
				$havehides.eq($(this).index()).addClass(cName);
				$hides.eq($(this).index()).stop().fadeIn();
			},function(){
				$ulhide.stop().slideUp();
				$nav.removeClass(cName);
				$havehides.eq($(this).index()).removeClass(cName);
				$hides.eq($(this).index()).stop().fadeOut();
			});
		}
}
