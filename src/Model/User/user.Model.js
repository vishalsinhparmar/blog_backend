const mongoose = require('mongoose');

const LoginSchem = new mongoose.Schema({
    filepath:{
        type:String,
       require:true
    },
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isVerified:{
        type:Boolean,
        default:false,

    },
    resetToken:{
        type:String,
        default:null
    }
},{timestamps:true});

const UserSignUp = mongoose.model('User',LoginSchem);

module.exports = UserSignUp;