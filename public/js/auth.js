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

if(document.querySelector('.auth')){

  // Sign up process
  document.querySelector('#signUp').addEventListener('submit', (event) => {
    event.preventDefault();
    let message = document.querySelector('#signUp .message');
    let messageSpan = document.querySelector('#signUp .message span');
    request('POST', '/api/user/signUp', (data) => {
      const badRequest = data.status === 400;
      message.classList.remove(badRequest ? 'green' : 'red');
      message.classList.add(badRequest ? 'red' : 'green');
      messageSpan.textContent = badRequest ? data.responseText : 'User created successfully!';
      message.style.display = 'block';
      if(!badRequest){
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    }, parseForm("signUp"));
  });

  // Sign in process
  document.querySelector('#signIn').addEventListener('submit', (event) => {
    event.preventDefault();
    let message = document.querySelector('#signIn .message');
    let messageSpan = document.querySelector('#signIn .message span');
    request('POST', '/api/user/signIn', (data) => {
      const badRequest = data.status === 400;
      message.classList.remove(badRequest ? 'green' : 'red');
      message.classList.add(badRequest ? 'red' : 'green');
      messageSpan.textContent = badRequest ? data.responseText : 'Signed in!';
      message.style.display = 'block';
      if(!badRequest){
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    }, parseForm("signIn"));
  });

}
