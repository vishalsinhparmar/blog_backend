const { request } = require('express');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
     comment:{
        type:String,
        require:true
     },
      userid:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'User',
         required:true
      },
      blogid:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Blog',
         require:true
      }

},{timestamps:true})

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;