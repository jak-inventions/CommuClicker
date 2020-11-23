const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Constants
const router = express.Router();
const { signInValidation, signUpValidation } = require('../validation.js');
const User = require('../models/User.js');

// Convert request body string to object
router.use((req, res, next) => {
  req.body = JSON.parse(Object.keys(req.body)[0]);
  next();
});

router.post('/signUp', async (req, res) => {

  // Validates the data before creating a user
  if(req.body.password === req.body.confirm){
    delete req.body.confirm;
    const {error} = signUpValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  }
  else{
    return res.status(400).send("Password's don't match");
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
    password: hashedPassword,
    score: 0
  });

  // Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_KEY);

  try{
    await user.save();
    return res.cookie('auth-token', token).send();
  }
  catch(err){
    return res.status(400).send(err);
  }
});

// Login
router.post('/signIn', async (req, res) => {
  // Validates the data before logging in a user
  const {error} = signInValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // Checking if user is already in the database
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send('Email not found');

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Invalid password');

  // Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_KEY);
  return res.cookie('auth-token', token).redirect('/messaging');
});

module.exports = router;
