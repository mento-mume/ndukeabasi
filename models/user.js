const mongoose = require ('mongoose')
const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity");
const config = require ('config')
const jwt = require('jsonwebtoken')

//creating user schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength:5,
        maxLength: 25

    },

    email:{
        unique:true,
        type:String,
        minLength:5,
        maxLength: 255,
        required:true
    },

    password:{
        type:String,
        minLength:5,
        maxLength: 1024,
        required:true

    },

    isAdmin:{
        type:Boolean
    }
})

//creatig a method to generate token and also load the payload with
//id and isAdmin properties
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, isAdmin:this.isAdmin},config.get('myprivatekey'))
    return token;
 
}

const User = mongoose.model('User',userSchema)

function validateUser(user){
    const schema = Joi.object( {
        name: Joi.string().min(5).max(25).required(),
        email:Joi.string().min(5).max(255).email().required(),
        password: passwordComplexity().required()
    })

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;

