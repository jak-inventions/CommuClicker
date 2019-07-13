


var database = firebase.database();

function setScore() {
  firebase.database().ref('score').set({
    universalScore: 5
  });
}

function increment(){

  setScore();

}

function pxToInt(pixelForm){

  return parseInt(pixelForm.substring(0, pixelForm.indexOf("px")))

}
