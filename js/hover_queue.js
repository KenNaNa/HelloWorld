function hover_queue(obj,pos){
	if(!obj&&typeof obj!=='object')return;
	obj['hover'](function(){
		$(this).stop().addClass(pos);
	},function(){
		 $(this).stop().delay(500).queue(function () {
            $(this).removeClass(pos);
        });
	});
}