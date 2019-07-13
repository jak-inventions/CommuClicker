


var database = firebase.database();

function writeUserData() {
  firebase.database().ref('score').set({
    universalScore: 5
  });
}

writeUserData()

function increment(){



}

function pxToInt(pixelForm){

  return parseInt(pixelForm.substring(0, pixelForm.indexOf("px")))

}
