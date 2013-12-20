
var sendToNzbGet = function (fileName, data, host, port, username, password) {
  var text = btoa(data);

  var requestraw = { "method": "append", "params": [fileName, "", 0, false, text], "id": 1 }
  var request = JSON.stringify(requestraw);
  
  var xmlhttp = new XMLHttpRequest();
    
  var url = "http://"+host+":"+port+"/"+username+ ":"+ password+"/jsonrpc";
  xmlhttp.open('POST', url, true);
  xmlhttp.setRequestHeader("Content-Type","application/json");
  xmlhttp.send(request);
}

chrome.downloads.onChanged.addListener(function(downloadDelta) {
	if(typeof(downloadDelta.state) !== "undefined" && downloadDelta.state.current === "complete") {
		chrome.downloads.search({"id":downloadDelta.id}, function(items) {
			var item = items[0];
			if(item.filename.lastIndexOf(".nzb") > -1) {
				var xhr = new XMLHttpRequest();
				xhr.onload = function() {
					var content = xhr.responseText;
					
					var host = localStorage["server"];
					var port = localStorage["port"];
					var username = localStorage["username"];
					var password = localStorage["password"];
					
					sendToNzbGet(item.filename, content, host, port, username, password);

					chrome.downloads.removeFile(item.id);
					chrome.downloads.erase({"id": item.id});
					console.log(item.filename + " sent to nzbget");
				}
				xhr.open("GET", item.filename);
				xhr.send();
			}
		});
	}
});
