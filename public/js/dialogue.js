// Dialogue functions
function toggleDialogue(num){
  let other = num === 0 ? 1 : 0;
  dom.dialogue[num].classList.toggle('open');
  if(dom.dialogue[num].classList.contains('open') && dom.dialogue[other].classList.contains('open')){
    toggleDialogue(other);
  }
}

function toggleDisplay(ele){
  ele.style.display = window.getComputedStyle(dom.auth[0]).display === 'none' ? 'inherit' : 'none';
}

function toggleAuth(){
  toggleDisplay(dom.auth[0]);
  toggleDisplay(dom.auth[1]);
}

function closeMessage(){
  document.querySelector('.message').style.display = 'none';
}
