import multer from "multer";
// Configurazione di Multer
const storage = multer.diskStorage({
    destination: (req, file, callbackFn) => {
        callbackFn(null, "public/images");
    },
    filename: (req, file, callbackFn) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        callbackFn(null, uniqueName);
    }
});

const upload = multer({ storage });

// Middleware per il caricamento multiplo
export const uploadMultiple = upload.array("images", 10); // "images" è il nome del campo nel form, massimo 10 file

export default upload;
