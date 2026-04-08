const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  course:{
    type:String,
    default:""
  },
  branch:{
    type:String,
    default:""
  },
  year:{
    type:String,
    default:""
  }
},{timestamps:true});

const User = mongoose.model("User", userSchema);

module.exports = User;
