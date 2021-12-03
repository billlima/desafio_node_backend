import { ArquivoService } from "./arquivo.service";

const multer = require('multer');
const router = require('express').Router();
const upload = multer({ dest: __dirname + '/upload' });

const service = new ArquivoService();

router.route('/upload')
   .post(upload.single('file'), service.upload);

router.route('/download/:id')
   .get(service.download);

export default router;