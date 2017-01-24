var express = require('express');
var passport = require('passport');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var request = require('request');
var db = require('../lib/index.js');

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { env: env });
});

router.get('/login',
  function(req, res){
    res.render('login', { env: env });
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/presenters', ensureLoggedIn, function(req, res) {


  db.default.getPresenters( function(err, data ) {
    if( err ) res.render('error', { error: err });

    res.render('presenters', {user: req.user, presenters: data });
  })


});

router.get('/form',ensureLoggedIn, function(req, res) {
  res.render('form', {user: req.user});
});

router.post('/form', ensureLoggedIn, function(req, res) {

  console.log(req.body);

  res.render('presenters', {user: req.user});
});

router.get('/user', ensureLoggedIn, function(req, res, next) {
  res.render('user', { user: req.user });
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/presenters');
  });

module.exports = router;
