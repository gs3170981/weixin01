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
			},{
				title:'邛崃景区门票通票',
				tag:'成人票',
				money:260,
				src:'../../public/img/imgDemo.png'
			},{
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
		//生成父级
		$('body').append("<ul id='ticketListList' class='ticketList'></ul>")
		if(getData.length==0){
			$('#ticketListList').text('暂无数据');
			return false;
		}
		
		//数据加载
		domDeploy(getData);
		
		function domDeploy(obj){
			
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
						title:'邛崃景区门票通票',
						tag:'成人票',
						money:260,
						src:'../../public/img/imgDemo.png'
					},{
						title:'邛崃景区门票通票',
						tag:'成人票',
						money:260,
						src:'../../public/img/imgDemo.png'
					},{
						title:'邛崃景区门票通票',
						tag:'成人票',
						money:260,
						src:'../../public/img/imgDemo.png'
					},{
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
				]);
         	}else if(top<=0){
            	console.log("下拉刷新");
         	}
       	})
		function getAjax(){
			$.ajax({
				type:"post",
				url:"http://192.168.11.124:8012/ticket/query/list.htm",
				async:true,
				data:{
					current_page:1,
					page_size:10
				},
				dataType:'jsonp',
				jsonp: "callback",
				success:function(res){
					return res;
				}
			});
		}
	}
})
