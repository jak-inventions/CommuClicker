
//Initializes settings on first load

if(localStorage.getItem("settingsButtonSide") == null){
  localStorage.setItem("settingsButtonSide", "right");
}

if(localStorage.getItem("clickerChroma") == null){
  localStorage.setItem("clickerChroma", "off");
}
