const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Constants
const router = express.Router();
const { signInValidation, signUpValidation } = require('../validation.js');
const User = require('../models/User.js');

router.post('/signUp', async (req, res) => {

  // Validates the data before creating a user
  if(req.body.password === req.body.confirm){
    delete req.body.confirm;
    const {error} = signUpValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  }
  else{
    res.status(400).send("Password's don't match");
  }

  // Checking if user email is already in the database
  const emailExists = await User.findOne({email: req.body.email});
  if(emailExists) return res.status(400).send('Email already exists');

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Creates a new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });

  // Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

  try{
    const savedUser = await user.save();
    res.cookie('auth-token', token).send({user: user.id});
  }
  catch(err){
    res.status(400).send(err);
  }
});

module.exports = router;
