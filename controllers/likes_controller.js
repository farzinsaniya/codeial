const Like = require('../models/like');
const Post = require('../models/posts');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.toggleLike = async function(req, res){
    try {
        // console.log('reaching here');
        
        let likeable;
        let deleted = false;
        if (req.query.type == 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        //check if the like already exists
        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.type,
            user : req.user._id
        });
        //if like already exists then delete it
        if (existingLike) {
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }else{
            //make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
       return res.status(200).json({
            messsage: "Request sucessful",
            data: {
                    deleted: deleted
            }
        })
        // return res.json(200, {
        //     messsage: "Request sucessful",
        //     data: {
        //             deleted: deleted
        //     }
        // })
    } catch (err) {
        console.log('error ocurred', err);
        return res.status (500).json( {
            messsage: 'Internal server error'
        });
    }
}