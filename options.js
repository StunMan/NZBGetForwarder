
function loadOptions() {
  var server = document.getElementById("server");
  document.getElementById("server").value = localStorage["server"];
  document.getElementById("port").value = localStorage["port"];
  document.getElementById("username").value = localStorage["username"];
  document.getElementById("password").value = localStorage["password"];
}

function saveOptions() {
  localStorage["server"] = document.getElementById("server").value;
  localStorage["port"] = document.getElementById("port").value;
  localStorage["username"] = document.getElementById("username").value;
  localStorage["password"] = document.getElementById("password").value;
}

window.onload = function() {
  loadOptions();
  document.getElementById('save').onclick = function() {
    saveOptions();
  }
}
