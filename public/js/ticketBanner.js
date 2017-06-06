//调用唯一入口
function ticketBanner(append,str){
	var obj='',spot='';
	for(var i=0;i<str.length;i++){
		obj+="<li class='left' style='height:100%;width:"+$(append).width()+"px;'>"
			+"<img style='height:100%;width:100%;' src="+str[i].src+">"
		+"</li>";
		spot+="<span name='ticketBannerSpot' class='white' style='margin:.05rem;font-size:.2rem;'>○</span>";
	}
	$(append).append("<ul id='ticketBannerUl' style='height:100%;' class='clearF'>"
		+obj
	+"</ul>"
	+"<p class='tx-c rel' style='margin-top:-.7rem;'>"+spot+"</p>");
	var ticketBannerSpot=$("span[name='ticketBannerSpot']");
	$(ticketBannerSpot[0]).text('●');
	$('#ticketBannerUl').width($(append).width()*str.length);
	var ticketBannerIs=true;//start与end判断为每次起始必须动画完成后才能再次点击
	var e_x=0,obj_l=0,e_n_x_c=0;e_arr=[],obj_n_x=0;
	var timer;
	//监听事件
	$(append).on('touchstart',function(){
		if(ticketBannerIs){
			ticketBannerIs=false;
//			console.log('按下');
			ticketBannerStart(event,$(append));
			$(append).on('touchmove',function(){
//				console.log('移动');
				ticketBannerMove(event,$(append));
			});
			$(append).on('touchend',function(){
//				console.log('结束');
				ticketBannerEnd($(append));
				$(append).unbind('touchmove');
				$(append).unbind('touchend');
			});
		}
	});

	//初始化translateX各个分段
	ticketBannerArr(str,append);
	
	
	function ticketBannerArr(obj,append){
		var w=$(append).width(),c=-w;
//		if(obj.length<1)return false;
		for(var i=0;i<obj.length;i++){
			e_arr.push({
				start:c+w,
				end:c+w+w
			})
			c+=w;
		}
	}
	function ticketBannerStart(event,obj){
		document.querySelector('body').addEventListener('touchstart',function (ev){
		    event.preventDefault();
		});
		//初始化
		e_x=event.touches[0].clientX;
		//获取当前translateX值
		obj_n_x=getTranslateX();
	}
	function ticketBannerMove(event,obj){
		var nowX=getTranslateX();
		//左右溢出空间留白
		if(nowX<=50 && nowX>=-(e_arr[e_arr.length-1].start+50)){
			var e_n_x=event.touches[0].clientX;//now_X
			//移动偏差
			e_n_x_c=e_n_x-e_x;
			$('#ticketBannerUl').css('transform','translateX('+(obj_n_x+e_n_x_c)+'px)');
		}
	}
	function ticketBannerSection(index){
		for(var i=0;i<e_arr.length;i++)
			if(index>=e_arr[i].start && index<e_arr[i].end)
				return i;
		return 0;//这里需要对最左边的null处理
	}
	function ticketBannerEnd(obj){
		var w_m=$(obj).width()/2;
		var obj_n_c_x=Math.abs(obj_n_x);
		//is=0 为--
		var cache=0,is=0;//一个标记，cache=1时，默认首张图片点击右移
		//判断区间
		var index=ticketBannerSection(obj_n_c_x);
		if(e_n_x_c>=w_m && e_n_x_c>0){//left
//				console.log('left');
			cache=index-1;
			if(cache==-1){
				cache=0;//防止左溢出
				is=0;
			}else is=1;
		}else if(Math.abs(e_n_x_c)>=w_m && e_n_x_c<0){//right
			cache=index+1;
			if(cache==e_arr.length)	{//防止右溢出
				cache=index;
				is=1;
			}else is=0;
//				console.log('right');
		}else if(e_n_x_c>0){
			cache=index;
//				console.log('弹回left');
		}else if(e_n_x_c<0){
			cache=index;
			is=1;
//				console.log('弹回right');
		}
		if(obj_n_x==getTranslateX()) {
			cache=index+1;
			if(cache==e_arr.length)	{//返回首
				cache=0;
				is=1;
			}else is=0;
//				console.log('单击');
		}
		$(ticketBannerSpot).text('○');
		$(ticketBannerSpot[cache]).text('●');
		getTranslateXMove(e_arr[cache],is);
	}
	function getTranslateXMove(index,is){
		var nowX=getTranslateX();
		var n=0;
		timer=setInterval(function(){
			//这里为了两边等式成立，必须for，而不n+=2等
			for(var i=0;i<3;i++){
				if(is)n++;else n--;
				var c=nowX+n;
				if(-index.start==c){
					$('#ticketBannerUl').css('transform','translateX('+c+'px)');
//					tickNumber=0;
					ticketBannerIs=true;
					clearInterval(timer);
					return false;
				}
				$('#ticketBannerUl').css('transform','translateX('+c+'px)');

			}
		})
	}
	function getTranslateX(){
		var obj=$('#ticketBannerUl').css('transform');
		if(obj=='none')return 0;
		obj=obj.substring(obj.indexOf('(')+1,obj.length-1).split(',');
		return parseInt(obj[4]);
	}
}
