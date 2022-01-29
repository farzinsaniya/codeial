const Message = require('../models/message');


module.exports.createMessage = async function(req, res){
  try {
    console.log(req.body);
    let msg= await Message.create({
        content: req.body.message[1],
        user: req.user
    })
    if (req.xhr){
        console.log(msg);
                return res.status(200).json({
                    data: {
                        message: msg
                    },
                    message: "Post deleted"
                });
            }
            return res.redirect('back');
  } catch (error) {
      console.log('error occurred', error);
      return res.redirect('back');
  } 
}