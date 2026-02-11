import multer from "multer";
import path from "path";

// storage

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },  //cb --> callback hai
    filename:(req,file,cb)=>{
        const uniqueName = 
        Date.now() +"-"+Math.round(Math.random() * 1e9);
        cb(null,uniqueName + path.extname(file.originalname));
    }
});

// file types valdation

const fileFilter = (req,file,cb) =>{
    if(file.mimetype.startswith("image/") || file.mimetype === "application/pdf"){
        cb(null,true);
    }
    else{
        cb(new Error("Only images and pdf files are allowed"),false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});