const express = require('express');
const blogs = require('../Controller/blogs/blog.js');
const authMiddleware = require('../Middleware/authMidlleware.js');
const upload = require('../utils/multer.js')

const router = express.Router();

router.post('/createBlog',authMiddleware,upload.single('image'),blogs.createBlog);
router.get('/showblog',authMiddleware,blogs.showBlog);
router.get('/blogByid/:id',authMiddleware,blogs.showBlogbyid);
 router.get('/blogByUserid/:id',authMiddleware,blogs.showUserblogbyId);

// get delete and update
router.get('/Userblog',authMiddleware,blogs.showBloguser);
router.delete('/Userblogdelete/:id',authMiddleware,blogs.userdeleteBlog);
router.get('/blogUpdatebyid/:id',authMiddleware, blogs.userBlogUpdateshowbyid);

router.patch('/UserblogUpdte/:id',authMiddleware,upload.single('image'),blogs.userUpdateBlog);

// comment section for blogs

router.post('/blogbyid/:blogid/comment',authMiddleware, blogs.commentData);
router.get('/blogbyid/:blogid/comment',authMiddleware, blogs.commentDatashow);









module.exports = router;