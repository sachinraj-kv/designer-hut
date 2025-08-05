const express = require('express');

const upload = require('../middleware/multerConfig');
const { uploadDesign, uploadDesignView, uploadedFileView, detailed_Upload, search_methed, search_method, uplodedfiledelete } = require('../controller/design.uploadController');
const { designuploadValidaton } = require('../middleware/userValidation');
const { authorization } = require('../auth/authorization');

const routers = express.Router();


routers.route('/upload/:id').post(upload.single("images"), designuploadValidaton, uploadDesign)
routers.route('/search').post(search_method)
routers.route('/view/upload').get(uploadDesignView)
routers.route('/view/userupload/:id').get(uploadedFileView).delete(uplodedfiledelete)




module.exports = routers