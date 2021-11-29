
// Elements
let dom = {
  clicker: document.getElementById('clicker'),
  dialogue: document.getElementsByClassName('dialogue'),
  scoreCount: document.getElementById('scoreCount'),
  leaderboard: document.getElementById('leaderboard'),
  account: document.getElementById('account'),
  leaderboardButton: document.getElementById('leaderboardButton'),
  accountButton: document.getElementById('accountButton'),
  auth: document.getElementsByClassName('auth')
}

// Sets score on page load
window.onload = () => {
  request('get', '/score', (data) => {
    dom.scoreCount.innerText = parseScore(data.responseText);
  });
}

// Processes user clicks
clicker.onclick = () => {
  request('post', '/increment');
}

// Logout function
function logout(){
  document.cookie = 'auth-token=';
  window.location.href = '/';
  console.log('logginging out');
}

// Delete account function
function deleteAccount(){
  let confirmDelete = confirm("Are you sure you'd like to delete your account?");
  if (confirmDelete) {
    request('delete', '/api/user/delete', (data) => {
      if(data.responseText === 'success'){
        logout();
      }
      else{
        console.log(data);
        alert('Error occurred');
      }
    });
  }
}

//Connects to Socket
let socket = io.connect('/');

// Updates the score when other players click
socket.on('updateScore', (data) => {
  document.getElementById('scoreCount').innerText = parseScore(data.score);
});
