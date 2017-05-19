$(function(){
//	唯一调用入口
	ready();

	function ready(){
		
//		获取ajax数据
//		var getData=getAjax();
		var getData={//模拟数据
			header:{
				img:[
					{
						src:'../../img/imgDemo.png'
					},{
						src:'../../img/imgDemo.png'
					},{
						src:'../../img/imgDemo.png'
					},{
						src:'../../img/imgDemo.png'
					},{
						src:'../../img/imgDemo.png'
					}
				],
				title:'邛崃景区门票通票',
				tag:'成人票',
				money:260,
				oldMoney:280,
				welf:[0,1,2]
			},
			detail:[
				{
					title:'门票详情',
					det:'一个手机号最多可预订9份联票。电瓶船整个浏览行程一小时，分为四段，每次15分钟。其中第三段如果客人要坐电瓶车的话也可以，但坐了电瓶车就不能坐电瓶船了（就等于直接出园了）免费政策：身高1.2M以下（含1.2M）有成年人监护的儿童入园免门票及电瓶船票；儿童6周岁（含6周岁）以下有成年人监护的儿童、70周岁以上老人、现役军人、残疾人、本市离休干部、浙江省三十年以上教龄教师凭有效证件享受门票免票。'
				},{
					title:'游玩须知',
					det:'123'
				},{
					title:'预订须知',
					det:'321'
				},{
					title:'开放时间',
					det:'asdsadsad'
				}
			],
			order:{
				list:[
					{
						title:'成人票',
						val:0
					},{
						title:'姓名',
						val:'杨一'
					},{
						title:'手机号码',
						val:123
					},{
						title:'身份证号',
						val:456456
					}
				],
				remark:'备注'
			}
		}
		//数据加载
		domDeploy(getData);
		
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
			$('body').append('<header>'
				+'<div id="banner" class="tickDetail-top-banner"></div>'
				+'<ul class="tickDetail-top-ul">'
					+'<li class="tickDetail-top-ul-title">'+header.title+'</li>'
					+'<li class="tickDetail-top-ul-tag hui">'+header.tag+'</li>'
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
					+"<span class='left'>"+orderList[i].title+"</span>"
					+"<input type='text' class='right tx-r tickDetail-order-input' />"
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
				+"<textarea class='tickDetail-order-remark' placeholder='填写备注信息'></textarea>"
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
				$('#tickDetailAllMoney').text(val*money);
				$('#tickDetailNumber').text(val);
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
