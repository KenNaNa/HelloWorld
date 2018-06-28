/**
 * line的上下滑动
 */
//获取元素


//获取相对于父元素的偏移top值

function move(){
	var $line = $('#download').find('#line');
	var timer = null;
	var top = $line.position().top;
    cancelAnimationFrame(timer);
	//console.log(top);//35
	top += 0.5;
	if(top>149.5){
		top = 150;
		top -= 0.5;
	}
	$line.get(0).style.top = top + 'px';
	if(top<=34.5){
		top = 35;
		top += 0.5;
	}
	console.log(top);
	$line.get(0).style.top = top + 'px';

	//console.log(1);
	timer = requestAnimationFrame(move);
}