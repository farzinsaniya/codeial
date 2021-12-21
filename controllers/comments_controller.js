const Comment = require('../models/comment');
const Post = require('../models/posts');

module.exports.create = function(req, res) {
    Post.findById(req.body.post, function(err, post){
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment) {
                console.log('error occurred', err);

                //updating
                post.comments.push(comment);
                //save and block changes in DB
                post.save();
                res.redirect('/');
            });
        }
    });
}