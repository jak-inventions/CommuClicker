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
  request('POST', '/api/user/signUp', (data) => {
    console.log(data.status);
    if(data.status === 400){
      document.querySelector('.message').classList.remove("green");
      document.querySelector('.message').classList.add('red');
      document.querySelector('.message span').textContent = data.responseText;
    }
    else{
      document.querySelector('.message').classList.remove("red");
      document.querySelector('.message').classList.add('green');
      document.querySelector('.message span').textContent = 'User created successfully!';
    }
    document.querySelector('.message').style.display = 'block';
  }, parseForm("signUp"));
});

// Sign in process
