
let xhttp = new XMLHttpRequest();

window.onload = () => {
  xhttp.open("POST", "/getScore", true);
  xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhttp.send();
  xhttp.onload = function() {
    document.getElementById('scoreCount').innerText = xhttp.responseText;
  }
}

document.getElementById('clicker').onclick = () => {
  xhttp.open("POST", "/increment", true);
  xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhttp.send();
  xhttp.onload = function() {
    document.getElementById('scoreCount').innerText = xhttp.responseText;
  }
}
