const mongoose = require('mongoose');

const likeScheme = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId
    },
    //defines the ID of the liked object
    likeable:{
        type: mongoose.Schema.ObjectId,
        required: true,
        //By using onModel Mongoose will look at the onModel property to find the right model dynamically.
        refPath: 'onModel'
    },
    //dynamic referencing defining the type of the object being liked
    onModel:{
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', 'likeable');
module.exports = Like;