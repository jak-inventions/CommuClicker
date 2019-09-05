
//Swirly Brackets belong on the same line as the if statment

var settingsButtonRotation = 0;

window.onload = function(){

  firebase.auth().signInAnonymously().catch(function(error) {

    var errorCode = error.code;

    var errorMessage = error.message;

    console.log(errorCode);

    console.log(errorMessage);

  });

  firebase.auth().onAuthStateChanged(function(user) {

  if (user) {

    var isAnonymous = user.isAnonymous;

    var uid = user.uid;

    document.getElementById("LoadingAnimation").style.display = "none";

    document.getElementById("Main").style.display = "block";

  } else {

    //Couldn't sign in

    console.log("Couldn't sign in");

  }

});

}

var universalScore;

try{

  firebase.database().ref("score/universalScore").on('value', function(snapshot) {

    universalScore = snapshot.val();

    document.getElementById("ScoreBoard").innerHTML = "World Score : <br/>" + numberWithCommas(universalScore);

  });

  function addToScore(amount) {

    if(universalScore != undefined){

      firebase.database().ref("score").set({

        universalScore: universalScore + amount

      });

    }

    else{

      document.getElementById("ScoreBoard").textContent = "Loading the score";

    }

  }

  function increment(){

    clicker = document.getElementById("Clicker");

    if(localStorage.getItem("clickerChroma") == "on"){

      randInt = [];

      for(var i = 0; i < 3; i++)randInt.push(Math.random() * 255);

      clicker.style.background = "rgb(" + randInt[0] +"," + randInt[1] + "," + randInt[2] + ")";

    }

    else{

      clicker.style.background = "#f5b362";

    }

    addToScore(1);

  }

}

catch(e){

  document.getElementById("ScoreBoard").textContent = "Unable to load the score";

}

function pxToInt(pixelForm){

  return parseInt(pixelForm.substring(0, pixelForm.indexOf("px")))

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Spin Animation

function spin(ele){

  settingsButtonRotation += 180;

  document.getElementById("SettingsButton").style.transform = 'rotate(' + settingsButtonRotation + 'deg)';

}
