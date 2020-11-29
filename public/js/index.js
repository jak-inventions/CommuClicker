
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

//Connects to Socket
let socket = io.connect('/');

// Updates the score when other players click
socket.on('updateScore', (data) => {
  document.getElementById('scoreCount').innerText = parseScore(data.score);
});
