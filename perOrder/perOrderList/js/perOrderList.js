$(function(){
//	唯一调用入口
	ready();

	function ready(){
		
//		获取ajax数据
		var getData1=getAjax();
		var getData={
			title:'我的订单',
			list:[
				{
					number:'201705192231',
					is:0,//状态码
					src:'../../public/img/imgDemo.png',
					title:'景区成人票123123',
					money:260,
					several:1,
					timer:'2016-12-27 11:34'
				},{
					number:'201705192231',
					is:1,//状态码
					src:'../../public/img/imgDemo.png',
					title:'景区成人票123123',
					money:260,
					several:1,
					timer:'2016-12-27 11:34'
				}
			]
		}
		var listIs=[
			{
				is:0,
				title:'支付成功',
				color:'blue'
			},{
				is:1,
				title:'已兑换',
				color:'blue'
			}
		]
		$('#perOrderList').append("<h1 class='perOrderList-title'>"+getData.title+"</h1><ul id='perOrderListUl' class='perOrderList-ul'></ul>");
		var perOrderList=getData.list;
		if(perOrderList.length==0){
			$('#perOrderListUl').text('暂无数据');
			return false;
		}
		//数据加载
		domDeploy(perOrderList);
		
		function domDeploy(perOrderList){
			for(var i=0;i<perOrderList.length;i++){
				for(var j=0;j<listIs.length;j++)
					if(perOrderList[i].is==listIs[j].is)
						break;
				$('#perOrderListUl').append("<li>"
					+"<ul class='clearF perOrderList-ul-li-top'>"
						+"<li class='left'>订单编号: </li>"
						+"<li class='left'>"+perOrderList[i].number+"</li>"
						+"<li class='right "+listIs[j].color+"'>"+listIs[j].title+"</li>"
					+"</ul>"
					+"<div class='perOrderList-ul-li-mid bg-hui clearF'>"
						+"<img class='perOrderList-ul-li-mid-img left' src="+perOrderList[i].src+" />"
						+"<ul>"
							+"<li class='perOrderList-ul-li-mid-title'>"+perOrderList[i].title+"</li>"
							+"<li class='perOrderList-ul-li-mid-money'>￥ "+perOrderList[i].money+" <span class='perOrderList-ul-li-mid-several hui'>X "+perOrderList[i].several+"</span></li>"
							+"<li class='hui perOrderList-ul-li-mid-timer'>"+perOrderList[i].timer+"</li>"
						+"</ul>"
					+"</div>"
					+"<p class='perOrderList-ul-li-bottom clearF tx-r'>共"+perOrderList[i].several+"件商品　合计：<span class='red'>￥"+perOrderList[i].several*perOrderList[i].money+"</span></p>"
					+"<p class='bg-hui perOrderList-line'></p>"
				+"</li>");
			}
		}
		//绑定上拉下拉
	 	$(window).scroll(function(){
　        		var top = $(this).scrollTop();
    　　  		var d_h = $(document).height();
        　　   	var w_h = $(this).height();
　       	 	if(top + w_h >= d_h){
                console.log("上拉加载");
                //ajax
                //这里要一个if来判断是否为空,则给用户显示没数据了.
                domDeploy([
					{
						number:'201705192231',
						is:0,//状态码
						src:'../../public/img/imgDemo.png',
						title:'景区成人票123123',
						money:260,
						several:1,
						timer:'2016-12-27 11:34'
					},{
						number:'201705192231',
						is:1,//状态码
						src:'../../public/img/imgDemo.png',
						title:'景区成人票123123',
						money:260,
						several:1,
						timer:'2016-12-27 11:34'
					}
				]);
         	}else if(top<=0){
            	console.log("下拉刷新");
         	}
      	})
		function getAjax(){
			
			$.ajax({
				type:"post",
				url:getAjaxUrl+"macro/query/user/order.htm",
				async:true,
				success:function(rel){
					
				},
				error:function(rel,status){
					$('#loading').hide();
					if(status=='timeout'){
			　　　　　  	alert("请求超时,请刷新页面重试");
						console.log(JSON.stringify(rel));
			　　　　}else {
						alert('接口请求失败,请联系后台管理员');
						console.log(JSON.stringify(rel));
					}
				}
			});
			
			
			
			
//			$.ajax({
//				type:"post",
//				url:getAjaxUrl+"macro/user/self.htm",
//				async:true,
//				success:function(res){
//					//用户查询到信息后才可获取列表
////					$.ajax({
////						type:"post",
////						url:"",
////						async:true
////					});
//				},
//				timeout:4000,
//				error:function(rel,status){
//					if(status=='timeout'){
//			　　　　　  	alert("请求超时");
//						console.log(JSON.stringify(rel));
//			　　　　}else {
//						alert('接口请求失败');
//						console.log(JSON.stringify(rel));
//					}
//				}
//			});
		}
	}
})
