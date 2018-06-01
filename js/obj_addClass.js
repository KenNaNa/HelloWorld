function obj_addClass(obj,cName,index){
	if(!obj && obj!=='object')return ;
	obj.eq(index).addClass(cName).siblings().removeClass(cName);
	obj.on('click',function(){
		$(this).addClass(cName).siblings().removeClass(cName);
	});
}

