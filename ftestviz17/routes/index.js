"use strict"
const express = require('express');
const passport = require('passport');
const Account = require('../models/account');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { user : req.user });
});

router.get('/register', (req, res) => {
    res.render('register', { });
});
/*
//Register User with this link
router.post('/register', (req, res, next) => {
    Account.register(new Account({ username : req.body.username }), req.body.password, (err, account) => {
        if (err) {
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});

*/
router.get('/login', (req, res) => {
    res.render('login', { user : req.user, error : req.flash('error')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});



function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){
        next();
 }else{
    res.redirect('/login');
 }
}

router.get('/ping', checkAuthentication, (req, res) => {
    res.status(200).send("pong!");
});

module.exports = router;    

