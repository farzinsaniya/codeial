//creating a custom middleware for flash messages
//a middleware has 3 arguments : req, res, next
//Connect-flash stores flash messages in session-cookies
//libraries used to implement flash mssg
//a) express-flash-messages
// b) connect-flash
// d) Express-flash-2

module.exports.setFlash = function(req, res, next) {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next();
}