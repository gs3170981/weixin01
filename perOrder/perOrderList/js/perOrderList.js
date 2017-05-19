$(function(){
//	唯一调用入口
	ready();

	function ready(){
		
//		获取ajax数据
//		var getData=getAjax();
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
		//数据加载
		domDeploy(getData);
		
		function domDeploy(obj){
			$('body').append("<ul id='ticketListList' class='ticketList'></ul>")
			if(obj.length==0){
				$('#ticketListList').text('暂无数据');
				return false;
			}
			for(var i=0;i<obj.length;i++)
				$('#ticketListList').append("<li class='ticketList-li clearF'>"
					+"<img class='ticketList-li-img left' src='"+obj[i].src+"' />"
					+"<div class='clearF ticketList-li-det'>"
						+"<h3 class='ticketList-li-det-title'>"+obj[i].title+"</h3>"
						+"<p class='ticketList-li-det-p hui'>"+obj[i].tag+"</p>"
						+"<ul class='clearF ticketList-li-det-bottom'>"
							+"<li class='left bold blue ticketList-li-det-bottom-money'>"
								+"<span class='no-blod'>￥</span>"+obj[i].money+""
							+"</li>"
							+"<li name='ticketListListClick' class='right white ticketList-li-det-bottom-up uc-a2 tx-c'>立即预定</li>"
						+"</ul>"
					+"</div>"
				+"</li>");
			//事件绑定
			$("li[name='ticketListListClick']").click(function(){
				console.log(this);
			})
		}
		function getAjax(){
			$.ajax({
				type:"get",
				url:"",
				async:true,
				success:function(res){
					return res;
				}
			});
		}
	}
})
