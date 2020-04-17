
let xhttp = new XMLHttpRequest();
let rotation = 0;

window.onload = () => {
  xhttp.open("POST", "/getScore", true);
  xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhttp.send();
  xhttp.onload = function() {
    document.getElementById('scoreCount').innerText = numberWithCommas(xhttp.responseText);
  }
}

document.getElementById('clicker').onclick = () => {
  xhttp.open("POST", "/increment", true);
  xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhttp.send();
  xhttp.onload = function() {
    document.getElementById('scoreCount').innerText = numberWithCommas(xhttp.responseText);
  }
}

function toggleSettings(){
  rotation += 180;
  document.getElementById('settingsButton').style.transform = 'rotate(' + rotation +'deg)';
  document.getElementById("settings").classList.toggle("open");
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
