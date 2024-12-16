const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    filepath:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    comments:[]
},{timestamps:true});

const Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;