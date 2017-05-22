//身份证校验
function validateId(opt){
	var json = {};
	var re=/^\d{17}(\d|X|x)$/;
	if (re.test(opt)){
		var weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];    //十七位数字本体码权重
		var validate = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];    //mod11,对应校验码字符值
		var sum = 0;
		var mode = 0;
		var id17 = opt.substring(0, 17);
		for (var i = 0; i <17; i++)
			sum = sum + parseInt(id17.substring(i,i+1) * weight[i]);
		mode = sum % 11;
		var c = opt[17];
		json.success = (c == validate[mode]);
	}else json.success=false;
	if(json.success == false)
		json.errorMessage = '身份证格式错误';
	return json;
}
//手机校验
function validatePhone(opt){//手机号码验证11位
    var json = {};
    if((/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(opt)) && opt.length==11){
        json.success=true;
    }else {
    	json.success=false;
		json.errorMessage = '请填写正确的手机号';
    }
	return json;
}
//中文校验
function validateName(opt){//手机号码验证11位
    var json = {};
    if((/[^\u4e00-\u9fa5]/.test(opt)) && opt.length<2){
    	json.success=false;
		json.errorMessage = '请填写正确的中文名字';
    }else {
        json.success=true;
    }
	return json;
}