
//Swirly Brackets belong on the same line as the if statment

var database = firebase.database();
var settingsButtonRotation = 0;
var universalScore;
//For individual player score
//var playerScore;

database.ref("score/universalScore").on('value', function(snapshot) {
  universalScore = snapshot.val();
  updateScoreboard();
  //For individual player score
  /*if(totalPlayers != null){
    playerScore = (universalScore / totalPlayers).toFixed(2);
    document.getElementById("PlayerScore").innerHTML = "Your Score : <br/>" + numberWithCommas(playerScore);
  }*/
});


function increment(){
  chromaClick();
  if(universalScore != undefined){
    database.ref("score").set({
      universalScore: universalScore + 1
    });
  }
  else{
    document.getElementById("ScoreBoard").textContent = "Loading the score";
  }
}

//Changes the color of the clicker if chroma clicker is enabled

function chromaClick(){
  clicker = document.getElementById("Clicker");
  if(localStorage.getItem("clickerChroma") == "on"){
    randInt = [];
    for(var i = 0; i < 3; i++)randInt.push(Math.random() * 255);
    clicker.style.background = "rgb(" + randInt[0] +"," + randInt[1] + "," + randInt[2] + ")";
  }
  else{
    clicker.style.background = "#f5b362";
  }
}

//Sets scoreboard to the universalScore

function updateScoreboard(){
  document.getElementById("ScoreBoard").innerHTML = "World Score : <br/>" + numberWithCommas(universalScore);
}

//Adds commas to raw integer

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Spin Animation

function spin(ele){
  settingsButtonRotation += 180;
  document.getElementById("SettingsButton").style.transform = 'rotate(' + settingsButtonRotation + 'deg)';
}
