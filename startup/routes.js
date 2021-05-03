const user = require('../routes/user.js')
const auth = require('../routes/auth.js')
const express = require('express');



module.exports = function(app){
    
app.use(express.json())
app.use('/api/user', user)
app.use('/api/auth',auth)
}
