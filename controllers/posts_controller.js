//stores the data which is being sent via the posts form
const Post = require('../models/posts')
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try {
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
    });
//AJAX sends XMLHttpRequest i.e. xhr
//JSON format is used to communicate with the server using AJAX
            if (req.xhr) {
                return res.status(200).json({
                    data :{
                        post : post
                    },
                    message: "Post created!!"
                });
            }

        req.flash('success', 'Post published successfully!');
    return res.redirect('back');
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
    
}

module.exports.destroy = async function(req, res){
    try {
        let post = await Post.findById(req.params.id);

        // .id means converting the object id into string
        if (post.user == req.user.id){
            post.remove();

        await Comment.deleteMany({post: req.params.id});
        if(req.xhr){
            return res.status(200).json({
                data : {
                    post_id : req.params.id
                },
                message : "Post deleted successfully!!"
            })
        }
        req.flash('success', 'Post & its comments deleted successfully!');
        return res.redirect('back');
        }else{
            req.flash('error','You cannot delete this post!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }

}