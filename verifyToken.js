const app = require('express')();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

module.exports = function(req, res, next){
  const token = req.cookies['auth-token'];
  if(token){
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = verified;
  }
  next();
}
