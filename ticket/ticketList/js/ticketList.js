$(function(){
//	唯一调用入口
	ready();

	function ready(){
		
//		获取ajax数据
//		var getData=getAjax();
		var getData=[//模拟数据
			{
				title:'邛崃景区门票通票',
				tag:'成人票',
				money:260,
				src:'../../public/img/imgDemo.png'
			},{
				title:'邛崃景区门票通票',
				tag:'成人票',
				money:260,
				src:'../../public/img/imgDemo.png'
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
