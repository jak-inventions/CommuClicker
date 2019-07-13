
var database = firebase.database();

let universalScore;

firebase.database().ref("score/universalScore").on('value', function(snapshot) {

  universalScore = snapshot.val();

  document.getElementById("ScoreBoard").textContent = universalScore;

});

function addToScore(amount) {
  firebase.database().ref("score").set({
    universalScore: universalScore + amount
  });
}

function increment(){

  addToScore(1);

}

function pxToInt(pixelForm){

  return parseInt(pixelForm.substring(0, pixelForm.indexOf("px")))

}
