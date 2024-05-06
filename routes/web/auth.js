const express = require('express');
const router = express.Router();
const UserModel = require(`../../models/UserModel`)
const md5 = require(`md5`)

// Register
router.get(`/reg`, (req, res) => {
  // Respond with HTML
  res.render(`reg`)
})

// Register user
router.post(`/reg`, (req, res) => {
  // Retrieve request body data
  UserModel.create({...req.body, password: md5(req.body.password)})
  .then(data => res.render(`success`, {msg: `Registration successful`, url: `/login`}))
  .catch(err => {
    console.log(err);
    const error = {
      status: 500, // Internal Server Error
      stack: err.stack
    };
    // Render the error page with the error information
    res.render(`error`, {message: `Registration failed, please try again later`, error: error});
    return
  })
})


// Login
router.get(`/login`, (req, res) => {
  res.render(`login`)
})

// Login
router.post(`/login`, (req, res) => {
  // Retrieve username and password
  let {username, password} = req.body
  // Query the database
  UserModel.findOne({username: username, password: md5(password)})  
  .then(data => {
    const error = {
      status: 401,
      stack: `No StacK Trace available`
    }
    if (!data) {
      return res.render(`error`, {message: `Incorrect username or password`, error: error})
    }
    // Write to session
    req.session.username = data.username
    req.session._id = data._id

    res.render(`success`, {msg: `Login successful`, url: `/account`})
  })
  .catch(err => {
    console.log(err);
    const error = {
      status: 500, // Internal Server Error
      stack: err.stack
    };
    // Render the error page with the error information
    res.render(`error`, {message: `Log in failed, please try again later`, error: error});
    return
  })
})

//  Log out
router.post(`/logout`, (req, res) => {
  req.session.destroy(() => {
    res.render(`success`, {msg: `Log out`, url: `/login`})
  })
})

module.exports = router;
