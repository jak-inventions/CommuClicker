
var totalPlayers;
var signedIn = false;

//Sets Players online to text box
firebase.database().ref("players/totalPlayers").on('value', function(snapshot) {
  totalPlayers = snapshot.val();
  document.getElementById("PlayersOnline").innerHTML = "Players Online : <br/>" + numberWithCommas(totalPlayers);
  if(totalPlayers != null){
    playerScore = (universalScore / totalPlayers).toFixed(2);
    document.getElementById("PlayerScore").innerHTML = "Your Score : <br/>" + numberWithCommas(playerScore);
  }
  if(!signedIn){
    if(totalPlayers != undefined){
      for(var i = 0; i < 2; i++){
        firebase.database().ref("players").set({totalPlayers: totalPlayers++});
        signedIn = true;
      }
    }
    else{
      document.getElementById("PlayersOnline").textContent = "Loading";
    }
  }

});

//Adds player to total players onload

function addPlayer(){
  if(totalPlayers != undefined){
    for(var i = 0; i < 2; i++){
      firebase.database().ref("players").set({totalPlayers: totalPlayers++});
    }
  }
  else{
    document.getElementById("PlayersOnline").textContent = "Loading";
  }
}

var substractedPlayer = false;

//Removes player from total players when they leave
window.addEventListener("beforeunload", function (e) {
  if(!substractedPlayer){
    subtractPlayer();
    substractedPlayer = true;
  }
});
window.addEventListener("unload", function (e) {
  if(!substractedPlayer){
    subtractPlayer();
    substractedPlayer = true;
  }
});

function subtractPlayer(){
  if(totalPlayers != 0){
    for(var i = 0; i < 2; i++){
      firebase.database().ref("players").set({
        totalPlayers: totalPlayers--
      });
    }
  }
}
