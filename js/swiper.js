function swiper(obj,type,json,time){
		if(!obj)return;//如果obj不存在 就跳出
		if( typeof type==='string'&&type===undefined ){
			type =  type || 'show';
		}else if( typeof type==='object'  ){
			json = type || {'opacity':1};
		}else if( typeof type==='number' ){
			time = type || 1000;
		}
		
		if(typeof obj[type] === 'function' && (typeof obj[type])!==undefined){
			obj[type]().stop().animate(json,time);
		}
	}