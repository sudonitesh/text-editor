var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongo = require('mongodb');
var db = require('monk')('');//cloud db addr here




 router.get('/', function(req, res, next) {
   res.render('editor', { title: 'Text Editor' });
 });

 router.get('/show/:id', function(req, res, next) {
    var posts = db.get('posts');
    posts.findOne(req.params.id, function(err, post){
        res.render('show', {
            'post':post
        });
        // res.send(post);
    });
  });



router.post('/', function(req, res, next){
    var body = req.body.body;
    var date = new Date();

    console.log(body);

    //validation
    req.checkBody('body', 'it should have some text').notEmpty();

    //errors
    var errors = req.validationErrors();
    if(errors){
        // res.render('editor', {errors});
    } else{
        var posts = db.get('posts');
        posts.insert({body, date}, function(err, post){
            if(err){
                res.send(err);
            } else{
                // console.log(post);
                res.location('/');
                res.redirect('/');
            }
        });

    }

});

router.post('/getlink', function(req, res, next){
    var body = req.body.body;
    var date = new Date();

    var posts = db.get('posts');
    posts.insert({body, date}, function(err, post){
        if(err){
            res.send(err);
        } else {//website.com/editor/show/'+post._id
            res.render('getlink', {link: "website"+post._id})
        }
    });



});




module.exports = router;
