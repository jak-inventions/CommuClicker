// Variables
let xhttp = new XMLHttpRequest();

// Server request function
function request(method, path, callback, data={}){
  xhttp.open(method, path, true);
  xhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xhttp.send(JSON.stringify(data));
  xhttp.onload = function() {
    callback(xhttp);
  }
}

// Makes object from form names and values
function parseForm(formName){
  const inputs = [...document.forms[formName].getElementsByTagName("input")];
  let user = {};
  inputs.forEach(input => {
    user[input.name] = input.value;
  });
  return user;
}

// Sign up process
document.querySelector('#signUp').addEventListener('submit', (event) => {
  event.preventDefault();
  let message = document.querySelector('.message');
  let messageSpan = document.querySelector('.message span');
  request('POST', '/api/user/signUp', (data) => {
    const badRequest = data.status === 400;
    message.classList.remove(badRequest ? 'green' : 'red');
    message.classList.add(badRequest ? 'red' : 'green');
    messageSpan.textContent = badRequest ? data.responseText : 'User created successfully!';
    message.style.display = 'block';
  }, parseForm("signUp"));
});

// Sign in process
