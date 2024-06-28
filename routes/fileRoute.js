import express from 'express';
import { uploadImg,deleteFile } from '../controllers/fileControllers.js';
import multer from "multer";

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
      return cb(null, './public/uploads');
    },
    filename : (req,file,cb)=>{
      return cb(null, `${new Date().toLocaleDateString()+ '-' + file.originalname}`);
    }
});

const upload = multer({storage})

const router = express.Router()

router.route('/').post(upload.single('avatar'),uploadImg)
router.route('/:id').delete(deleteFile)

export default router;