
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

//Opens Settings Tab

function toggleSettings(){

  if(getComputedStyle(document.getElementById("Settings"), null).display == "none"){

    $(document).ready(function(){

      $("#Settings").slideDown(500);

    });

    spin(this);

  }

}

//Closes settings when you click out of it

window.addEventListener('click', function(e){

  if (!document.getElementById("Settings").contains(e.target)){

    //Clicked out of settings

    if(getComputedStyle(document.getElementById("Settings"), null).display == "block"){

      $(document).ready(function(){

        $("#Settings").slideUp(500);

      });

      spin(this);

    }

  }

});

//Settings Button Side

function updateButtonSide(ele){

  settingsButton = document.getElementById("SettingsButton");

  if(ele.value == "right"){

    settingsButton.style.left = "auto";
    settingsButton.style.right = "20px";

    localStorage.setItem("settingsButtonSide", "right");

  }

  else{

    settingsButton.style.right = "auto";
    settingsButton.style.left = "20px";

    localStorage.setItem("settingsButtonSide", "left");

  }

}

//Sets settings onload

window.addEventListener("load", function(){

  settingsButton = document.getElementById("SettingsButton");

  settingsButtons = document.getElementsByClassName("SettingsSelect buttonSide");

  //Button Side

  if(localStorage.getItem("settingsButtonSide") == "right"){

    settingsButton.style.left = "auto";
    settingsButton.style.right = "20px";

    settingsButtons[0].getElementsByTagName('option')[0].selected = "selected";
    settingsButtons[0].getElementsByTagName('option')[1].selected = "";

  }

  else{

    settingsButton.style.right = "auto";
    settingsButton.style.left = "20px";

    settingsButtons[0].getElementsByTagName('option')[0].selected = "";
    settingsButtons[0].getElementsByTagName('option')[1].selected = "selected";

  }

});
