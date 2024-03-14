import express from 'express';
import multer from 'multer';

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, './data/images'); // Si es una foto, se guarda en uploads/images
    } else if (file.mimetype === 'application/vnd.ms-excel' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      cb(null, './data/excel');  // Si es un archivo Excel, se guarda en data/excel
    } else {
      cb(new Error('Tipo de archivo no permitido')); // Si no es de ninguno de los tipos permitidos, se genera un error
    }
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  }
});
const upload = multer({ storage: storage });

export{
    upload
}