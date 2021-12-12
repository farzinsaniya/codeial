//here profile is the NAME of the FUNCTION
module.exports.profile = function(req, res){
    //return res.end('<h1>Express is up for Codeial</h1>');

    return res.render('user_profile', {
        title : "User Profie"
    });
}