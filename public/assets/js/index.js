


var database = firebase.database();

function setScore() {
  firebase.database().ref("score").set({
    universalScore: 5
  });
}

firebase.database().ref("score/universalScore").on('value', function(snapshot) {

  document.getElementById("ScoreBoard").textContent = snapshot.val();

});

function increment(){

  setScore();

}

function plusAnimation(){makePlus();}

function makePlus(){

  /*var ele = document.createElement('p');
  ele.textContent = "+1";
  ele.setAttribute('class', 'PlusOne');
  document.getElementById("Clicker").appendChild(ele);
  ele.style.position = "absolute";
  ele.style.top = "50%";
  ele.style.left = "50%";*/


}

function pxToInt(pixelForm){

  return parseInt(pixelForm.substring(0, pixelForm.indexOf("px")))

}
