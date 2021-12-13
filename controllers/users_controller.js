//here profile is the NAME of the FUNCTION
module.exports.profile = function(req, res){
    //return res.end('<h1>Express is up for Codeial</h1>');

    return res.render('user_profile', {
        title : "User Profie"
    });
}

//adding actions

//render the signup page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up Page"
    });
}

//render the signin page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In Page"
    });
}

//get the user's data
module.exports.create = function(req, res){
    //todo later
}

//sign in & create a session for the user
module.exports.createSession = function(req, res){
    //to do later
}