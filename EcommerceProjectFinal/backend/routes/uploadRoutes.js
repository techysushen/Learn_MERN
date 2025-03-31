import path from "path";
import express from "express";
import multer from "multer";
const router=express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
  })

  function checkFileType(file, cb){
    const fileType = /jpg|jpeg|png/
    const extName = fileType.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileType.test(file.mimetype);
    if(extName && mimeType){
        return cb(null, true)
    }else{
        return cb('Images Only')
    }

  }
  
const upload = multer({ 
    storage: storage,
    fileFilter:function(req, file, cb){
        checkFileType(file,cb)
    }
});

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router;