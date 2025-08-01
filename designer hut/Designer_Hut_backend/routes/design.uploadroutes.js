const express = require('express');

const upload = require('../middleware/multerConfig');
const { uploadDesign, uploadDesignView, uploadedFileView, detailed_Upload } = require('../controller/design.uploadController');
const { designuploadValidaton } = require('../middleware/userValidation');
const { authorization } = require('../auth/authorization');

const routers = express.Router();


routers.route('/upload/:id').post(upload.single("images"), designuploadValidaton, uploadDesign)
routers.route('/view/upload').get(uploadDesignView)
routers.route('/view/userupload/:id').get(uploadedFileView)
routers.route('/detailed/Upload/:id').get(detailed_Upload)



module.exports = routers