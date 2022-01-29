const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // comment belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;