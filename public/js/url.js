var getAjaxUrl='http://192.168.11.124:8012/';
var getAddressUrl='http://192.168.11.124:8012/resources/';
function getUrlJson(){
	var url=window.location.href;
	var dataId=url.substring(url.lastIndexOf('?')+1,url.length);
	var string=dataId.split('&');
	var res={};
	for(var i=0;i<string.length;i++){
	    var str=string[i].split('=');
	    res[str[0]]=str[1];
	}
	return res;
}
