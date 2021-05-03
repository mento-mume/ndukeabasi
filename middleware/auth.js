const jwt = require('jsonwebtoken')
const config = require('config');


function auth (req,res,next){

    //setting token from header
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('access denied, no token provided')

    //verifying the jwt and setting the payload to req.user
    try {
        const decoded = jwt.verify(token,config.get('myprivatekey'))
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).send('invalid token')
        
    }
 
}

module.exports = auth;