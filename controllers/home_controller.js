//this file contains all the actions/controls
//EVERY CONTROLLER NEEDS A ROUTER TO BE ACCESSED
//below is the syntax for creating a CONTROLLER
//module.exports.functionName = function(req, res){
    //commands or statements
//}
const Post = require('../models/posts');
const User = require('../models/user');

//here home is the NAME of the FUNCTION
module.exports.home = function(req, res){
    //return res.end('<h1>Express is up for Codeial</h1>');

    // return res.render('home', {
    //     title : "Home"
    // });

    //poppulate the user
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){

        User.find({}, function(err, users){
            return res.render('home', {
                title: "Codeial | Home",
                posts:  posts,
                all_users: users
            });
        });

       
    })

}
//after creating the controller, access it in the router file