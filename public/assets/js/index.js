


var database = firebase.database();

function setScore() {
  firebase.database().ref('score').set({
    universalScore: 5
  });
}

function increment(){

  setScore();

}

function plusAnimation(){makePlus();}

function makePlus(){

  var ele = document.createElement('p');
  ele.textContent = "+1";
  ele.setAttribute('class', 'PlusOne');
  document.body.appendChild(ele);
  ele.style.position = "absolute";
  ele.style.top = (225 - 500) + "px";
  ele.style.left = (375 - 650) + "px";

}

function pxToInt(pixelForm){

  return parseInt(pixelForm.substring(0, pixelForm.indexOf("px")))

}
