const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {User} = require('../models/user.js')
const mongoose = require('mongoose')
const express = require('express')
const passwordComplexity = require("joi-password-complexity");
const router = express.Router()
const Joi = require('joi')


router.post('/', async(req,res)=>{
    //validating input with joi
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //collecting email from request and checking for it in db
    const user = await User.findOne({email:req.body.email})
    if (!user) return res.status(400).send('invalid email or password')

    //collecting password from request and comparing to pass in db
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if (!validPass) return res.status(400).send('invalid email or password')

    //generatinng token and sending it as response
    const token = user.generateAuthToken()
    res.send(token)


})
//localizing the validate function due to differences
function validate(req){
    const schema = Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity().required()
    }) 

    return schema.validate(req)
}
module.exports = router