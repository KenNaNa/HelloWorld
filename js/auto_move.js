function auto_move($tab_lis,$pic_ul,$pic_lis_w,$pic_lis_len,index){
	if(!$tab_lis && !$pic_ul && typeof tab_lis!=='object' && $pic_ul!=='object')retrun;
	index++;
	index = index%$pic_lis_len;
	$tab_lis.eq(index).addClass('on').siblings().removeClass('on');
	move_animate($pic_ul,index,{'left':-index*$pic_lis_w},500);
}