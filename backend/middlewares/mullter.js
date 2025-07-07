import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "upload/");
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    const fileExtensionAllowed = ['.mp3', '.jpg', '.jpeg', '.png', 'webp','.wav'];
    const ext = path.extname(file.originalname).toLowerCase();
    const isMimeTypeValid = file.mimetype.startsWith('audio/') || file.mimetype.startsWith('image/');
    const isExtTypeValid = fileExtensionAllowed.includes(ext);
     if (isMimeTypeValid && isExtTypeValid) {
        cb(null, true)
     }
        else {
            cb(new Error('Invalid file type. Only audio and image files are allowed.'));
        }
}
const upload = multer({
    storage,
    fileFilter
})

export default upload;