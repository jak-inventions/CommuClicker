
var database = firebase.database();

let universalScore;

function addToScore(amount) {
  firebase.database().ref("score").set({
    universalScore: universalScore + amount
  });
}

firebase.database().ref("score/universalScore").on('value', function(snapshot) {

  universalScore = snapshot.val();

  document.getElementById("ScoreBoard").textContent = universalScore;

});

function increment(){

  addToScore(1);

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
