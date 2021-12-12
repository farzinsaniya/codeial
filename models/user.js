const mongoose = require ('mongoose');

const mongooseSchema = new mongoose.Schema({
    email : {
        type:String,
        required : true,
        unique: true
    },

    password:{
        type: String,
        required: true,
    },

    name: {
        required: true,
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

model.exports = User;
