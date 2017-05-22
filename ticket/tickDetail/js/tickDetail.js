$(function(){
//	唯一调用入口
	ready();

	function ready(){
		
//		获取ajax数据
		$('body').append("<img id='loading' class='loading xf' src='../../public/img/loading.gif' />");
		getAjax();
		
		function domDeploy(obj){
		//	public
		//	|------横线
				var line="<p class='bg-hui tickDetail-line'></p>";
		//	header
			var header=obj.header;
			var welfAll=[
				{
					src:'../../public/img/3.png',
					title:'入园保障',
					klass:'green'
				},{
					src:'../../public/img/2.png',
					title:'微信专享',
					klass:'green1'
				},{
					src:'../../public/img/1.png',
					title:'免预约',
					klass:'blue1'
				}
			];
			var welf=header.welf,welfObj='';
			for(var i=0;i<welf.length;i++){
				welfObj+="<li class='right tickDetail-top-ul-det-welf'>"
					+"<img class='tickDetail-top-ul-det-welf-img left' src='"+welfAll[welf[i]].src+"' />"
					+"<span class='left tickDetail-top-ul-det-welf-title "+welfAll[welf[i]].klass+"'>"+welfAll[welf[i]].title+"</span>"
				+"</li>";
			}
			var tagList=header.tagList;
			var tagUl="";
			var tagUl_li="";
			if(tagList.length>0){
				for(var i=0;i<tagList.length;i++)
					tagUl_li+="<li data="+tagList[i].money+" name='ticketListTagListName' class='tickDetail-top-ul-list-li'>"+tagList[i].name+"</li>";
				tagUl+="<ul name='ticketListTagList' class='none tickDetail-top-ul-list hui bg-white clearF abs'>"
					+tagUl_li
				+"</ul>";
			}
			$('body').append('<header>'
				+'<div id="banner" class="tickDetail-top-banner clearF bg-hui"></div>'
				+'<ul class="tickDetail-top-ul">'
					+'<li class="tickDetail-top-ul-title">'+header.title+'</li>'
					+'<li id="ticketListTagName" class="tickDetail-top-ul-tag hui clearF">'+header.tag+'</li>'
					+tagUl
					+'<li class="clearF tickDetail-top-ul-det">'
						+'<ul class="left clearF">'
							+'<li id="tickDetailMoney" class="left tickDetail-top-ul-det-money red"><span class="tickDetail-top-ul-det-money-i">￥</span>'+header.money+'</li>'
							+'<li class="left hui tickDetail-top-ul-det-oldMoney"><del>￥'+header.oldMoney+'</del></li>'
						+'</ul>'
						+'<ul class="clearF">'
							+welfObj
						+'</ul>'
					+'</li>'
				+'</ul>'
			+'</header>');
			//list show
			$('#ticketListTagName').click(function(){
				var e=arguments.callee.caller.arguments[0] || event
				e=window.event || e;
				if(e.stopPropagation)e.stopPropagation();else e.cancelBubble=true;
				$('ul[name="ticketListTagList"]').show();
			})
			//tag列表项绑定事件
			$('li[name="ticketListTagListName"]').click(function(){
				//tag值更变
				$('#ticketListTagName').html($(this).text()+"<span class='dropDown tickDetail-top-ul-tag-span right'>▲</span>");
				//money更变
				$("#tickDetailMoney").html('<span class="tickDetail-top-ul-det-money-i">￥</span>'+$(this).attr('data'));
				//订单tag值更变
				$('#orderListType').text($(this).text());
				//订单总额计算
				$('#tickDetailAllMoney').text((parseFloat($(this).attr('data'))*parseInt($('#tickDetailNumber').text())).toFixed(2));
			})
			//list hide
			$(document).click(function(){
				$('ul[name="ticketListTagList"]').hide();
			})
			//banner添加事件
			ticketBanner('#banner',header.img);
		//line
			$('body').append(line);
		//detail
			var detObj='';
			var det=obj.detail
			for(var i=0;i<det.length;i++)
				detObj+="<a name='tickDetList' class='left tickDetail-det-list-a'>"+det[i].title+"</a>";
			$('body').append("<ul>"
				+"<li class='clearF tickDetail-det-list'>"
					+detObj
				+"</li>"
				+"<li id='tickDetDet' class='tickDetail-det-det'></li>"
			+"</ul>");
			//tab事件绑定
			$("a[name='tickDetList']").click(function(){
				$("a[name='tickDetList']").removeClass('tickDetList');
				$('#tickDetDet').text('');
				$(this).addClass('tickDetList');
				for(var i=0;i<det.length;i++)
					if($(this).text()==det[i].title)
						break;
				$('#tickDetDet').html(det[i].det);
			})
			$("a[name='tickDetList']")[0].click();
		//line
			$('body').append(line);
		//order
			var orderList=obj.order.list;
			var orderObj='';
			for(var i=1;i<orderList.length;i++)
				orderObj+="<li class='clearF tickDetail-order-li'>"
					+"<span id='orderListType' class='left'>"+orderList[i].title+"</span>"
					+"<input id="+orderList[i].id+" type='text' class='right tx-r tickDetail-order-input' />"
				+"</li>";
			$('body').append("<ul class='tickDetail-order'>"
				+"<li class='clearF tickDetail-order-li'>"
					+"<span class='left'>"+orderList[0].title+"</span>"
					+"<div class='right tx-c tickDetail-order-det'>"
						+"<span name='tickDetailPR' class='tickDetail-order-plus left'>-</span>"
						+"<span id='tickDetailPRNumber' class='tickDetail-order-val left'>"+orderList[0].val+"</span>"
						+"<span name='tickDetailPR' class='tickDetail-order-reduce left'>+</span>"
					+"</div>"
				+"</li>"
				+orderObj
				+"<li class='clearF'>"
					+"<span class='left'>"+obj.order.remark+"</span>"
				+"</li>"
				+"<textarea id='remark' class='tickDetail-order-remark' placeholder='填写备注信息'></textarea>"
			+"</ul>");
		//line
			$('body').append(line);
		//footer
			$('body').append("<footer class='tickDetail-bottom'>"
				+"<ul class='tickDetail-bottom-det clearF'>"
					+"<li class='left tickDetail-bottom-det-title'>订单总额</li>"
					+"<li class='left red'>￥<span id='tickDetailAllMoney' class='tickDetail-bottom-det-money'></span></li>"
					+"<li class='left hui tickDetail-bottom-det-number'>X<span id='tickDetailNumber'>0</span></li>"
				+"</ul>"
				+"<a class='tx-c uc-a2 white tickDetail-bottom-btn'>立即预定</a>"
			+"</footer>");
		//票价点击事件---要footer加载完才可
			$("span[name='tickDetailPR']").click(function(){
				var money=$('#tickDetailMoney').text();
				money=parseFloat(money.substring(1,money.length));
				var obj=$('#tickDetailPRNumber');
				var val=parseInt($(obj).text());
				if($(this).text()=='+')
					val++;
				else if(val>1)
					val--;
				$(obj).text(val);
				$('#tickDetailAllMoney').text((val*money).toFixed(2));
				$('#tickDetailNumber').text(val);
			})
			$("span[name='tickDetailPR']")[1].click();
		//立即预定点击事件
			$('.tickDetail-bottom-btn').click(function(){
				var name=$('#name').val();//必填
				var phone=$('#phone').val();//必填
				var idCard=$('#idCard').val();//必填
				var remark=$('#remark').val();
				var number=$('#tickDetailPRNumber').text();
				var money=$('#tickDetailAllMoney').text();
				var is='true';
				for(var i=0;i<1;i++){//执行一次用break跳
					if(!name || !phone || !idCard){
						is='您有未填写的信息请补充完整!';
						break;
					}else if(!validateId(idCard).success){
						var idCardCheck=validateId(idCard);
						is=idCardCheck.errorMessage;
						break;
					}else if(!validatePhone(phone).success){
						var phoneCheck=validatePhone(phone);
						is=phoneCheck.errorMessage;
						break;
					}else if(!validateName(name).success){
						var nameCheck=validateName(name);
						is=nameCheck.errorMessage;
						break;
					}
				}
				if(is=='true')alert('校验成功!');
				else alert(is);
			})
		}
		function getAjax(){
			var urlJson=getUrlJson();
			$.ajax({
				type:"post",
				url:getAjaxUrl+"ticket/query/one.htm",
				async:true,
				data:{
					id:urlJson.id
				},
				success:function(res){
					$('#loading').hide();
					var data=res.data;
					var tag=decodeURIComponent(getUrlJson().type) || '通用票';
					//数据载入层
					var getData={
						header:{
							img:[],
							title:data.name,
							tag:tag,//解码
							tagList:[],
							money:data.ticket_price,
							oldMoney:data.ticket_price,
							welf:[0,1,2]
						},
						detail:[
							{
								title:'门票详情',
								det:data.details
							},{
								title:'游玩须知',
								det:data.play_need_know
							},{
								title:'预订须知',
								det:data.buy_need_know
							}
//							,{
//								title:'开放时间',
//								det:'asdsadsad'
//							}
						],
						order:{
							list:[
								{
									title:tag,
									val:0
								},{
									title:'姓名',
									id:'name'
								},{
									title:'手机号码',
									id:'phone'
								},{
									title:'身份证号',
									id:'idCard'
								}
							],
							remark:'备注'
						}
					}
					//数据处理层---img列表导入
					var imgList=data.images;
					for(var i=0;i<imgList.length;i++)
						getData.header.img.push({
							src:imgList[i].thumb_medium
						})
					//票类型处理
					var tag=getData.header.tag;
					if(tag!='通用票'){
						var ticket_type=data.ticket_type;
						for(var i=0;i<ticket_type.length;i++)
							if(ticket_type[i].type_name==tag){
								getData.header.money=ticket_type[i].price;
								break;
							}
						getData.header.tag+="<span class='dropDown tickDetail-top-ul-tag-span right'>▲</span>"
					}
					//票列表处理
					var tagList=data.ticket_type;
					for(var i=0;i<tagList.length;i++)
						getData.header.tagList.push({
							money:tagList[i].price,
							name:tagList[i].type_name
						})
					domDeploy(getData);
				},
				timeout:4000,
				error:function(rel,status){
					if(status=='timeout'){
			　　　　　  	alert("请求超时"+JSON.stringify(rel));
			　　　　}else {
						alert('接口请求失败'+JSON.stringify(rel));
					}
				}
			});
		}
	}
})
