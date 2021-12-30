//this file contains all the actions/controls
//EVERY CONTROLLER NEEDS A ROUTER TO BE ACCESSED
//below is the syntax for creating a CONTROLLER
//module.exports.functionName = function(req, res){
    //commands or statements
//}
const Post = require('../models/posts');
const User = require('../models/user');

//here home is the NAME of the FUNCTION
module.exports.home = async function(req, res){
    //return res.end('<h1>Express is up for Codeial</h1>');

    // return res.render('home', {
    //     title : "Home"
    // });
    //using try-catch block rather than console.log everytym
                try {
                    //poppulate the user
    let posts = await Post.find({})
    .sort('createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
        let users = await User.find({})
            return res.render('home', {
                title: "Codeial | Home",
                posts:  posts,
                all_users: users
            });
                } catch (error) {
                console.log('error', err);
                return;
            }
    

}
//after creating the controller, access it in the router file