var bg = chrome.extension.getBackgroundPage();
var serviceData = bg.getCurrentServiceData();
console.log(serviceData);
if(serviceData.tosdr.rated != false)
	$('#tosdr').innerHTML("<b>"+serviceData.name+"</b> has been rated with "+serviceData.tosdr.rated+"<br/><a href='http://tos-dr.info/#"+serviceData.name+"'>Tell me more about "+serviceData.name+"'s ToS</a>");
else
	$('#tosdr').innerHTML("<b>"+serviceData.name+"</b> has not been rated yet.<br/><a href='http://tos-dr.info/#"+serviceData.name+"'>Tell me more about "+serviceData.name+"'s ToS</a>");

