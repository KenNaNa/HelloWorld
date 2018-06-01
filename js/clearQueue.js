function clearQueue($1,$2,cName,time){
	if(typeof $1!=='object'&&typeof $2!=='obj')return ;
	$1.stop();
	$2.stop();
	$1.addClass(cName).delay(time).queue(function(){
		$2.removeClass(cName);
	})
	
}