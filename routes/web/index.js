const express = require('express');
const AccountModel = require('../../models/AccountModel');
const checkLoginMiddleware = require(`../../middlewares/checkLoginMiddleware`)

const router = express.Router();

// Home page routing rule
router.get(`/`, (req, res) => {
  // Redirect to /account
  res.redirect(`/account`)
})

// Account book list
router.get('/account', checkLoginMiddleware, (req, res, next) => {
  // Retrieve account information
  AccountModel.find({ userId: req.session._id }).sort({time: -1})
  .then(data => {
    res.render(`list`, {accounts: data, userName: req.session.username})
  })
  .catch(err => {
    console.log(err);
    const error = {
      status: 500, // Internal Server Error
      stack: err.stack
    };
    // Render the error page with the error information
    res.render(`error`, {message: `Failed to retrieve account data`, error: error});
  })
})

// Add record
router.get('/account/create', checkLoginMiddleware, (req, res, next) => {
  res.render(`create`)
});

// Create new record
router.post(`/account`, checkLoginMiddleware, (req, res) => {
  // Insert into database
  AccountModel.create({
    ...req.body,
    userId: req.session._id,
    // Modify time attribute
    time: new Date(req.body.time)
  })
  .then(data => res.render(`success`, {msg: `Addition successful`, url: `/account`}))
  .catch(err => {
    console.log(err);
    const error = {
      status: 500, 
      stack: err.stack
    };
    res.render(`error`, {message: `Failed to add new record`, error: error});
  })
})

// Delete record
router.get(`/account/:id`, checkLoginMiddleware, (req, res) => {
  // Retrieve id parameter from params
  let id = req.params.id
  // Delete
  AccountModel.deleteOne({_id: id})
  .then(data => res.render(`success`, {msg: `Deletion Successful`, url: `/account`}))
  .catch(err => {
    console.log(err);
    const error = {
      status: 500, 
      stack: err.stack
    };
    res.render(`error`, {message: `Failed to Deletion`, error: error});
  })
})

module.exports = router;
