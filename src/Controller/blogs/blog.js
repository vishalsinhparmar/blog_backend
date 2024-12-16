const Blog = require('../../Model/blogs/blogs.model.js');
const Comment = require('../../Model/blogs/comment.model.js')
const createBlog = async (req,res)=>{
    const {title,description}= req.body;
    
    console.log(`the title:${title} description:${description}`);

    try{
        console.log('the req.file',req.file)
        const blogImage = req.file.path;
     
        console.log('the blog image is ',blogImage);
        const blogpost = await Blog.create({
            filepath:blogImage,
            title,
            description,
            authorId:req.user.sub
         
        })

        res.status(201).send({message:'the blog post is created successfully',blog:blogpost})

    }catch(err){
        // return res.status(401).send({message:'false',res:err.message})
        console.log(err.message)
    }
};

const showBlog = async (req,res) =>{
    const {page = 1 ,limit=3} = req.query;

    const skip = (page-1)*limit;
    try{
         
         const blogpost = await Blog.find().limit(Number(limit)).skip(skip).populate("authorId");
         const blogCount = await Blog.countDocuments();

         res.status(200).send({
            message:'the blog post is created successfully',
            blogpost,
            blogCount,
            page:Number(page),
            pages:Math.ceil(blogCount/limit)
        })
        

    }catch(err){
        res.status(401).send({message:'false',res:err.message})
        
    }
};

const showBlogbyid = async (req,res) =>{
    
    const {id} = req.params;
    
    try{
    if(!id){
    res.status(401).send({message:'i have not find any kind of blog'});
      
    }
    const blogPost = await Blog.findById(id).populate('authorId');

    res.status(200).send(blogPost);
    }catch(err){
    res.status(401).send({message:err.messsage});

    }
};

const showBloguser = async (req,res)=>{
     try{
        console.log('the user id is a ',req.user.sub)
    const blog = await Blog.find({authorId:req.user.sub});
    console.log("the user blog is",blog)
    res.status(200).send({blog});
     }catch(err){
    res.status(401).send({message:err.messsage});
     }

    
}
const showUserblogbyId = async (req,res)=>{
    const {id} = req.params
    try{
       console.log('the user id is a ',req.user.sub)
   const blog = await Blog.find({authorId:id}).sort({createdAt:-1});
   console.log("the user blog is",blog)
   res.status(200).send({blog});
    }catch(err){
   res.status(401).send({message:err.messsage});
    }

   
}
const userBlogUpdateshowbyid = async (req,res)=>{
    const {id} = req.params;
    
    // console.log('the updated data sent by client',updateData)
    try{
   const blog = await Blog.findById(id);
   console.log("the user blog is ",blog)
   res.status(200).send(blog);
    }catch(err){
   res.status(401).send({message:err.messsage});
    }
}
//  delete the blog 
const userUpdateBlog = async (req,res)=>{
    const {id} = req.params;
    const {title,description} = req.body;
    const blogImage = `http://localhost:5000/${req.file.path.replace(/\\/g,'/')}`;

    
    // console.log('the updated data sent by client',updateData)
    try{
   const blog = await Blog.findOneAndUpdate({_id:id},{
     title,
     description,
     filepath:blogImage
     
   },{new:true});
   console.log("the user blog is",blog)
   res.status(200).send(blog);
    }catch(err){
        console.log("the error message is",err.message)
   return res.status(401).send({message:err.messsage});
   
    }

   
}
const userdeleteBlog = async (req,res)=>{
    const {id} = req.params;
    try{
   const blog = await Blog.deleteOne({_id:id});
   console.log("the user blog is",blog)
   res.status(200).send(blog);
    }catch(err){
   res.status(401).send({message:err.messsage});
    }

   
}
//  comment functionalitty in the blog
    const commentData = async (req,res) =>{
        const {comment} = req.body;
        console.log("the comment for the comment sec",comment);
        const {blogid} = req.params
        console.log("the blog id is",blogid);

        try{
            const newComment = await Comment.create({
                comment,
                userid:req.user.sub,
                blogid
              
            });

            await Blog.findByIdAndUpdate(
                blogid ,
                 {
                    $push:{comments:newComment._id}
                 }
            );

            console.log('the newComment is',newComment);

            res.status(200).send({message:'the comment created successfully'});
        }catch(err){
            console.log('error occur in comment',err.message)
        }
    };

    const commentDatashow = async (req,res) =>{
        const {blogid} = req.params

        try{
          
            const commentData = await Comment.find({blogid}).populate("userid","username filepath");
             const commentCount = await Comment.find({blogid}).countDocuments();

            console.log('the comment data in the commentDatasshow',commentData,commentCount);


       
            res.status(200).send({commentData,commentCount});
         
        }catch(err){
            console.log('error occur in comment',err.message)
        }
    };

module.exports = {
    createBlog,
    showBlog,showBlogbyid,
    showBloguser,
    userdeleteBlog,
    userUpdateBlog,
    userBlogUpdateshowbyid,
    showUserblogbyId,
    commentData,
    commentDatashow
}