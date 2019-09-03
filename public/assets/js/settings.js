
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
