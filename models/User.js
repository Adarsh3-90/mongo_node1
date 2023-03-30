const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    company:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})

//MODEL
const UserModel=mongoose.model('User',userSchema)
module.exports=UserModel
