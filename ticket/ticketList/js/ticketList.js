$(function(){
//	唯一调用入口
	ready();

	function ready(){
		
//		获取ajax数据
		getAjax();

//		var getData=[//模拟数据
//			{
//				title:'邛崃景区门票通票',
//				tag:'成人票',
//				money:260,
//				src:'../../public/img/imgDemo.png'
//			},{
//				title:'邛崃景区门票通票',
//				tag:'成人票',
//				money:260,
//				src:'../../public/img/imgDemo.png'
//			},{
//				title:'邛崃景区门票通票',
//				tag:'成人票',
//				money:260,
//				src:'../../public/img/imgDemo.png'
//			},{
//				title:'邛崃景区门票通票',
//				tag:'成人票',
//				money:260,
//				src:'../../public/img/imgDemo.png'
//			},{
//				title:'邛崃景区门票通票',
//				tag:'成人票',
//				money:260,
//				src:'../../public/img/imgDemo.png'
//			}
//		]
		$('body').append("<img id='loading' class='loading xf' src='../../public/img/loading.gif' />");
		function domParent(getData){
			$('body').append("<ul id='ticketListList' class='ticketList'></ul>")
			if(getData.length==0){
				$('#ticketListList').text('暂无数据');
				return false;
			}
		}
		//生成父级
		
		
		//数据加载
		
		
		function domDeploy(obj){
			
			for(var i=0;i<obj.length;i++){
				var tag="<p class='ticketList-li-det-p hui'>已售空</p>";
				var tag_li='';
				var ticket_type=obj[i].ticket_type;
				var ticket_price=obj[i].ticket_price;
				var color='background:#d2d2d2';
				if(ticket_type.length){
					color='';
					tag="<p name='ticketListTagName' class='ticketList-li-det-p hui'>"+ticket_type[0].type_name+"<span class='dropDown right'>▲</span></p>";
					for(var j=0;j<ticket_type.length;j++)
						tag_li+="<li data="+ticket_type[j].price+" name='ticketListTagListName' class='ticketList-li-det-ul-li'>"+ticket_type[j].type_name+"</li>";
					tag+="<ul name='ticketListTagList' class='ticketList-li-det-ul hui clearF bg-white abs none'>"
						+tag_li
					+"</ul>";
					ticket_price=ticket_type[0].price;
				}
				$('#ticketListList').append("<li class='ticketList-li clearF'>"
					+"<img class='ticketList-li-img left' src='"+obj[i].logo_image+"' />"
					+"<div class='clearF ticketList-li-det'>"
						+"<h3 class='ticketList-li-det-title'>"+obj[i].name+"</h3>"
						+tag
						+"<ul class='clearF ticketList-li-det-bottom'>"
							+"<li name='ticketListMoney' class='left bold blue ticketList-li-det-bottom-money'>"
								+"<span class='no-blod'>￥</span>"+ticket_price+""
							+"</li>"
							+"<li data="+obj[i].id+" name='ticketListClick' class='right white ticketList-li-det-bottom-up uc-a2 tx-c' style='"+color+"'>立即预定</li>"
						+"</ul>"
					+"</div>"
				+"</li>");
				//如果tag有值的话，p绑定click事件
				if(ticket_type.length){
					$('p[name="ticketListTagName"]').click(function(){
						var e=arguments.callee.caller.arguments[0] || event
						e=window.event || e;
						if(e.stopPropagation)e.stopPropagation();else e.cancelBubble=true;
						$(this).parent().find('ul[name="ticketListTagList"]').show();
					})
				}
				//tag li事件绑定
				$('li[name="ticketListTagListName"]').click(function(){
					var parent=$(this).parent().parent();
					$(parent).find('p[name="ticketListTagName"]').html($(this).text()+"<span class='dropDown right'>▲</span>");
					$(parent).find('li[name="ticketListMoney"]').html("<span class='no-blod'>￥</span>"+$(this).attr('data'));
				})
			}
			//list hide
			$(document).click(function(){
				$('ul[name="ticketListTagList"]').hide();
			})
			//事件绑定
			$("li[name='ticketListClick']").click(function(){
				var type=$(this).parent().parent().find('p[name="ticketListTagName"]').text();
				type=type.substring(0,type.length-1);
				if(type)location.href=getAddressUrl+'ticket/tickDetail/tickDetail.html?id='+$(this).attr('data')+'&type='+type;
			})
		}
		//绑定上拉下拉
	 	$(window).scroll(function(){
　        		var top = $(this).scrollTop();
　　  		var d_h = $(document).height();
        　　   	var w_h = $(this).height();
　       	 	if(top + w_h >= d_h){
                console.log("上拉加载");
//              //ajax
//              //这里要一个if来判断是否为空,则给用户显示没数据了.
//              domDeploy([
//					{
//						title:'邛崃景区门票通票',
//						tag:'成人票',
//						money:260,
//						src:'../../public/img/imgDemo.png'
//					},{
//						title:'邛崃景区门票通票',
//						tag:'成人票',
//						money:260,
//						src:'../../public/img/imgDemo.png'
//					},{
//						title:'邛崃景区门票通票',
//						tag:'成人票',
//						money:260,
//						src:'../../public/img/imgDemo.png'
//					},{
//						title:'邛崃景区门票通票',
//						tag:'成人票',
//						money:260,
//						src:'../../public/img/imgDemo.png'
//					},{
//						title:'邛崃景区门票通票',
//						tag:'成人票',
//						money:260,
//						src:'../../public/img/imgDemo.png'
//					}
//				]);
         	}else if(top<=0){
            	console.log("下拉刷新");
         	}
       	})
		function getAjax(){
			$.ajax({
				type:"post",
				url:getAjaxUrl+"ticket/query/list.htm",
				async:true,
				data:{
					current_page:1,
					page_size:10
				},
				success:function(res){
					$('#loading').hide();
					var data=res.data.data;
					domParent(data);
					domDeploy(data);
				},
				timeout:4000,
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
		}
	}
})
