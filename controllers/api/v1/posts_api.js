const Post = require('../../../models/posts');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res) {

    let posts = await Post.find({})
    .sort('createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.json(200, {
        message: "list of posts",
        posts: posts
    });
}



module.exports.destroy = async function(req, res){
    try {
        let post = await Post.findById(req.params.id);

        // .id means converting the object id into string
    //    if (post.user == req.user.id){
            post.remove();

        await Comment.deleteMany({post: req.params.id});
        // if(req.xhr){
        //     return res.status(200).json({
        //         data : {
        //             post_id : req.params.id
        //         },
        //         message : "Post deleted successfully!!"
        //     })
        // }
        //req.flash('success', 'Post & its comments deleted successfully!');
        return res.json(200, {
            message: "Posts & its associated comments deleted successfully!"
        });
        // }else{
        //     req.flash('error','You cannot delete this post!');
        //     return res.redirect('back');
        // }
    } catch (err) {
        // req.flash('error', err);
        console.log('********', err);
        return res.json(500, {
            message: "internal server error"
        });
    }

}