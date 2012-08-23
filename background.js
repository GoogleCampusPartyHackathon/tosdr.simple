var tosdrServices = "http://tos-dr.info/index/services.json";
var tosdrServiceBase = "http://tos-dr.info/services/";
var currentService;
var services;
var servicesDetail = new Array();

function updateServiceIndex() {
	var now = new Date().getTime();
	if(localStorage.lastUpdate == undefined || localStorage.lastUpdate - now > 5*60*60*1000) {
		$.getJSON(tosdrServices, function(data) {
			//console.log(data);
			localStorage.services = JSON.stringify(data);
			services = data;
			// localStorage.lastUpdate = now;
		});
	} else {
		services = JSON.parse(localStorage.services);
	}
}

function getService(serviceName, callback) {

	if(localStorage.lastUpdate == undefined)
		updateServiceIndex();

	if(services[serviceName] != undefined) {
		// Service exists...
		$.getJSON(tosdrServiceBase+serviceName+".json", function(data) {
			currentService  = serviceName;
		
			servicesDetail[serviceName] = data;
			if(data.tosdr.rated != false)
				chrome.browserAction.setBadgeText({"text": data.tosdr.rated});
			else
				chrome.browserAction.setBadgeText({"text": "Unrated"});
			if(data.tosdr.rated == false || data.tosdr.rated > 'C')
				chrome.browserAction.setIcon({path:"red.png"});
			else
				chrome.browserAction.setIcon({path:"green.png"});
			// localStorage.lastUpdate = now;
		});
	}	
}

function getCurrentServiceData() {
	return servicesDetail[currentService];
}

function getNewInfo(t, info) {
	chrome.tabs.get(t, function(tab) { 
		var domParts = tab.url.replace('http://','').replace('https://','').split(/[/?#]/)[0].split(".");
		var service = domParts[domParts.length - 2];
		getService(service);
		
	});
}

chrome.tabs.onSelectionChanged.addListener(getNewInfo);
chrome.tabs.onUpdated.addListener(getNewInfo);

updateServiceIndex();
