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
					tagUl_li+="<li typeId="+tagList[i].id+" data="+tagList[i].money+" name='ticketListTagListName' class='tickDetail-top-ul-list-li'>"+tagList[i].name+"</li>";
				tagUl+="<ul name='ticketListTagList' class='none tickDetail-top-ul-list hui bg-white clearF abs'>"
					+tagUl_li
				+"</ul>";
			}
			$('body').append("<div id='row' style='overflow-y:auto;'></div>");			
			$('#row').append('<header>'
				+'<div id="banner" class="tickDetail-top-banner clearF bg-hui"></div>'
				+'<ul class="tickDetail-top-ul">'
					+'<li id="ticketName" class="tickDetail-top-ul-title">'+header.title+'</li>'
					+'<li id="ticketListTagName" data='+header.id+' class="tickDetail-top-ul-tag hui clearF">'+header.tag+'</li>'
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
				//typeId更变
				$('#ticketListTagName').attr('data',$(this).attr('typeId'));
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
			$('#row').append(line);
		//detail
			var detObj='';
			var det=obj.detail
			for(var i=0;i<det.length;i++)
				detObj+="<a name='tickDetList' class='left tickDetail-det-list-a'>"+det[i].title+"</a>";
			$('#row').append("<ul>"
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
			$('#row').append(line);
		//order
			var orderList=obj.order.list;
			var orderObj='';
			for(var i=1;i<orderList.length;i++)
				orderObj+="<li class='clearF tickDetail-order-li'>"
					+"<span class='left'>"+orderList[i].title+"</span>"
					+"<input id="+orderList[i].id+" type='text' class='right tx-r tickDetail-order-input' />"
				+"</li>";
			$('#row').append("<ul class='tickDetail-order'>"
				+"<li class='clearF tickDetail-order-li'>"
					+"<span data="+orderList[0].img_logo+" id='orderListType' class='left'>"+orderList[0].title+"</span>"
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
			$('#row').append(line);
		//footer
			$('#row').append("<footer class='tickDetail-bottom'>"
				+"<ul class='tickDetail-bottom-det clearF'>"
					+"<li class='left tickDetail-bottom-det-title'>订单总额</li>"
					+"<li class='left red'>￥<span id='tickDetailAllMoney' class='tickDetail-bottom-det-money'></span></li>"
					+"<li class='left hui tickDetail-bottom-det-number'>X<span id='tickDetailNumber'>0</span></li>"
				+"</ul>"
				+"<a class='tx-c uc-a2 white tickDetail-bottom-btn'>提交订单</a>"
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
				var id=$('#ticketListTagName').attr('data');
				var type=$('#ticketListTagName').text();
				var idName=$('#ticketName').text();
				type=type.substring(0,type.length-1);
				idName+='('+type+')';
				var img=$('#orderListType').attr('data');
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
				if(is=='true'){
					
//					//获取微信支付接口
//					$.ajax({
//						type:"post",
//						url:getAjaxUrl+"macro/wxpay.htm",
//						async:true,
//						data:{
//							order_no:"T52010265125256",
//							openid:"wxkdfjkdjkdljsfkdjfkdljfkldjf",
//							trade_type:"JSAPI"
//						},
//						success:function(res){
//							
//						},
//						timeout:4000,
//						error:function(rel,status){
//							if(status=='timeout'){
//					　　　　　  	alert("请求超时");
//								console.log(JSON.stringify(rel));
//					　　　　}else {
//								alert('接口请求失败');
//								console.log(JSON.stringify(rel));
//							}
//						}
//					});
					
					
					
					
//					//微信支付接口
//					function onBridgeReady(){
//					   WeixinJSBridge.invoke(
//					       'getBrandWCPayRequest', {
//					           "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入     
//					           "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
//					           "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
//					           "package":"prepay_id=u802345jgfjsdfgsdg888",     
//					           "signType":"MD5",         //微信签名方式：     
//					           "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
//					       	},
//					       	function(res){     
//					           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
//					           	
//				           		}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
//					       	}
//					   );
//					}
//					if (typeof WeixinJSBridge == "undefined"){
//					   if( document.addEventListener ){
//					       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
//					   }else if (document.attachEvent){
//					       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
//					       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
//					   }
//					}else{
//					   onBridgeReady();
//					}
					
					
					//储存数据库
					$.ajax({
						type:"post",
						url:getAjaxUrl+"macro/order/create.htm",
						data:{
							product_id:id,
							product_name:idName,
							product_type:"ticket",
							product_num:number,
							product_img:img,
							link_name:name,
							link_tel:phone,
							link_id_card:idCard,
							remarks:remark
						},
						async:true,
						success:function(rel){
							alert('预订成功!');
							//do something...
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
							id:'',//获取tag列表后,添加id值
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
							},
//							{
//								title:'开放时间',
//								det:'asdsadsad'
//							}
						],
						order:{
							list:[
								{
									title:tag,
									val:0,
									img_logo:data.logo_image
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
					if(tagList){
						for(var i=0;i<tagList.length;i++)
							getData.header.tagList.push({
								money:tagList[i].price,
								name:tagList[i].type_name,
								id:tagList[i].id
							})
						var tagListObj=getData.header.tagList;
						for(var i=0;i<tagListObj.length;i++)
							if(tagListObj[i].name==tag)
								break;
						getData.header.id=tagList[i].id;
					}
						
					domDeploy(getData);
				},
				timeout:4000,
				error:function(rel,status){
					if(status=='timeout'){
			　　　　　  	alert("请求超时");
						console.log(JSON.stringify(rel));
			　　　　}else {
						alert('接口请求失败');
						console.log(JSON.stringify(rel));
					}
				}
			});
		}
	}
})
