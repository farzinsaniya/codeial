//this file contains all the actions/controls

//below is the syntax for creating a CONTROLLER
//module.exports.functionName = function(req, res){
    //commands or statements
//}

//here home is the NAME of the FUNCTION
module.exports.home = function(req, res){
    return res.end('<h1>Express is up for Codeial</h1>');
}
//after creating the controller, access it in the main JS file