var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var path = require('path');
var jwt = require('jsonwebtoken');

router.get('/', function (req, res) {
    //res.render('index', { user : req.user });
    res.sendFile('index.html',{root: path.join(__dirname, '../app_client')} );
});

router.post('/register', function(req, res) {
    //res.render('register', { });
    // res.sendFile('register.view.html',{root: path.join(__dirname, '../app_client/auth/register')} );

});

router.get('/register', function(req, res) {
    //res.render('register', { });
    res.sendFile('register.view.html',{root: path.join(__dirname, '../app_client/auth/register')} );
});

router.post('/api/register', function(req, res) {
    console.log("API REGISTER");

    Account.register(new Account({ username : req.body.email, password: req.body.password }), req.body.password, function(err, account) {
        if (err) {
            return res.send(err);
        }
        else {

            passport.authenticate('local')(req, res, function () {
                var token = jwt.sign(account, 'superpassword');
                req.body.token = token;
                res.send(req.body);
            });
        }
    });
});

router.get('/profile', function(req, res){
    res.sendFile('profile.view.html',{
        root: path.join(__dirname, '../app_client/profile')
    } );
})

router.get('/login', function(req, res) {
    res.sendFile('login.view.html',{
        root: path.join(__dirname, '../app_client/auth/login')
    } );
});

router.post('/api/login', passport.authenticate('local'), function(req, res) {
    console.log("LOGGED IN!!");

    var account = req.body;
    var token = jwt.sign(account, 'superpassword');

    req.body.token = token;
    //res.render('profile.view.html', req.body);
    // res.send(req.body);
    //res.redirect('profile');
    // res.redirect('/');
    res.render('profile.view.html', req.body);
});

router.get('/api/profile', function(req, res) {
    res.render('profile.view.html', req.body);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;