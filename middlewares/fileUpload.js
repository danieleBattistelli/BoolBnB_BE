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
export const uploadMultiple = upload.array("immagini[]", 30);

export default upload;
