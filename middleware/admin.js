module.exports = function(req,res,next){

    //req.user has been set by auth middleware
    //token payload is checked.if user is admin
    if (!req.user.isAdmin) return res.status(403).send('forbidden')

    next()
}