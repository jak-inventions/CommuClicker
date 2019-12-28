
//Signs in user as a guest, if there's an error it asks them to reload

window.onload = function(){

  firebase.auth().signInAnonymously().catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      //These variables could be potentially useful later in development
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      document.getElementById("LoadingAnimation").style.display = "none";
      document.getElementById("Main").style.display = "block";
    }
    else {
      //Couldn't sign in
      console.log("Couldn't sign in");
      $(document).ready(function(){
        $("#ReloadDialogue").slideDown();
      });
    }
});

}
