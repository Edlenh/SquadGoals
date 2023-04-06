const mongoose = require('mongoose')
//bcrypt creates hashed passwords
const bcrypt = require('bcrypt')
//validator library checks for valid emails / kinda like regex
const validator = require('validator')
//Mongoose schema to link up to mongo db
const Schema = mongoose.Schema

//create user model with options
//unique true checks if the email is already in use or not.
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
});

//sign up method using static methods
//Statics allow for defining functions that exist directly on your Model.

userSchema.statics.signup = async function(email, username, password){
    //check for validation and if all info is provided, else throw error
    
    if(!email || !password){
        //check all fields are provided
        throw Error('Please Fill in All Fields')
    }
    if(!validator.isEmail(email)){
        throw Error('Please Provide Valid Email')
    }
    //Needs Cap, Numbers , special
    if(!validator.isStrongPassword(password)){
        throw Error('Password requires Uppercase, Numbers, and Special Character')
    }

    //check if provided email is already in use

    const userExists = await this.findOne({email})
    if(userExists){
        throw Error('Email aready in use')
    }
    
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    //need to pass in all arguements based on model. 
    const user = await this.create({email, username, password :hash})

    return user
}

//user login 
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All Fields required')
    }
    //avoid specific errors!
    const user = await this.findOne({email})
    if(!user){
        throw Error('Email or Password not valid')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Email or Password not valid')
    }
    return user

}

module.exports = mongoose.model('User', userSchema)