$(function(){
//	唯一调用入口
	ready();

	function ready(){
		
//		获取ajax数据
//		var getData=getAjax();
		var getData={
			is:0,
			list:[
				{
					title:'订单编号',
					text:'2017123'
				},{
					title:'订单详情',
					text:'2017123'
				},{
					title:'购票人',
					text:'2017123'
				},{
					title:'身份证号',
					text:'2017123'
				},{
					title:'联系方式',
					text:'2017123'
				},{
					title:'支付金额',
					text:'2017123',
					klass:'red'//这里判断下前面要加￥
				},{
					title:'支付时间',
					text:'2017123'
				},{//该项必须为最后一项，否则下面需调整
					title:'订单状态',
					text:'2017123',
					klass:''
				}
			]
		}
		var isList=[
			{
				is:0,//所有检索枚举，0为后台检索匹配方式
				src:'../../public/img/succ.png',
				title:'订单支付成功!',
				color:'green'
			}
		]
		//数据加载
		domDeploy(getData);
		
		function domDeploy(obj){
		//top
			for(var i=0;i<isList.length;i++)
				if(isList[i].is==obj.is)
					break;
			obj.list[obj.list.length-1].klass=isList[i].color;//该项必须为最后一项，否则下面需调整
		//list
			var list=obj.list;
			var perOrderDetailedObj='';
			for(var i=0;i<list.length;i++){
				var color='';
				if(list[i].klass)color=list[i].klass;else color='perOrderDetailed-list-det';
				perOrderDetailedObj+="<li class='clearF perOrderDetailed-list-li'>"
					+"<span class='left'>"+list[i].title+"</span>"
					+"<span class='right "+color+"'>"+list[i].text+"</span>"
				+"</li>";
			}
			$('body').append("<ul class='bg-white perOrderDetailed-list'>"
				+perOrderDetailedObj
			+"</ul>");
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
