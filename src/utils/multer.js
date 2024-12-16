const cloudinary = require('./ClodinaryConfigure.js')
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const multer = require('multer');
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"uploads/")
//     },
//     filename:(req,file,cb)=>{
//         const uniquename = `${Date.now()}--${file.originalname}`
//         cb(null,uniquename)
//     }
// });
const storage = new CloudinaryStorage({
     cloudinary:cloudinary,
     params:{
        folder:'uploads',
        allowed_formats:['jpeg','png','gif'],
        public_id:(req,file)=>`${Date.now()}-${file.originalname}`

     },
});

const upload = multer({
    storage,
    limits:{
        fileSize:100*1024
    },

    fileFilter:(req,file,cb)=>{
         const allowedfile = ['image/jpeg','image/png','image/gif'];
         if(allowedfile.includes(file.mimetype)){
            cb(null,true)
         }else{
           cb(new Error('only image are allowed'))
         }   
    },

});

module.exports = upload;