const auth = require('../middleware/auth.js')
const admin = require('../middleware/admin.js')
const bcrypt = require('bcrypt')
const {User, validate}= require('../models/user.js')
const mongoose = require('mongoose')
const _ = require('lodash')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.get('/me', auth, async(req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user)
})

router.post('/',async(req, res)=>{
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('user already exist!')

   
    user = new User( _.pick(req.body,['name','email','password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)

    await user.save()
    const token = user.generateAuthToken()
    res.header('x-auth-token',token).send(_.pick(user,['id','name','email']))
})

router.delete('/:id',[auth,admin],async (req,res)=>{
    const user =await User.findByIdAndRemove(req.params.id);

    if(!user) return res.status('404').send('the user with the id could not be found');

    res.send(user);
})

module.exports = router;