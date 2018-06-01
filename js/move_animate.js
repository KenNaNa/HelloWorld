function move_animate(obj,index,json,time){
	if(!obj && typeof obj!=='object'){
		return;
	}
	obj['stop']().animate(json,time);

}