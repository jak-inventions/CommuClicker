
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

window.addEventListener("click", function(e){

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

  localStorage.setItem("settingsButtonSide", ele.value);

  if(ele.value == "right"){

    settingsButton.style.left = "auto";
    settingsButton.style.right = "20px";

  }

  else{

    settingsButton.style.right = "auto";
    settingsButton.style.left = "20px";

  }

}

//Clicker clicker chroma

function updateClickerChroma(ele){

  localStorage.setItem("clickerChroma", ele.value);

}

//Sets settings onload

window.addEventListener("load", function(){

  settingsButton = document.getElementById("SettingsButton");
  settingsButtons = document.getElementsByClassName("SettingsSelect ButtonSide");

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

  //Clicker Chroma

  if(localStorage.getItem("clickerChroma") == "on"){

    settingsButtons[1].getElementsByTagName('option')[0].selected = "";
    settingsButtons[1].getElementsByTagName('option')[1].selected = "selected";

  }

  else{

    settingsButtons[1].getElementsByTagName('option')[0].selected = "selected";
    settingsButtons[1].getElementsByTagName('option')[1].selected = "";

  }

});
