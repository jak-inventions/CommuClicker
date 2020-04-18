
let xhttp = new XMLHttpRequest();
let rotation = 0;

window.onload = () => {
  xhttp.open("POST", "/getScore", true);
  xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhttp.send();
  xhttp.onload = function() {
    document.getElementById('scoreCount').innerText = parseScore(xhttp.responseText);
  }
}

document.getElementById('clicker').onclick = () => {
  xhttp.open("POST", "/increment", true);
  xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhttp.send();
  xhttp.onload = function() {
    document.getElementById('scoreCount').innerText = parseScore(xhttp.responseText);
  }
}

function toggleSettings(){
  rotation += 180;
  document.getElementById('settingsButton').style.transform = 'rotate(' + rotation +'deg)';
  document.getElementById("settings").classList.toggle("open");
}

function parseScore(score){
  return numberWithCommas(toFixed(score));
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}
