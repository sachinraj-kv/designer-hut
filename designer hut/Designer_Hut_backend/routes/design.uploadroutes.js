const express = require('express');

const upload = require('../middleware/multerConfig');
const { uploadDesign, uploadDesignView, uploadedFileView, detailed_Upload, search_methed, search_method, uplodedfiledelete, uploadprofile } = require('../controller/design.uploadController');
const { designuploadValidaton } = require('../middleware/userValidation');
const { authorization } = require('../middleware/authorization');


const routers = express.Router();


routers.route('/uploads').post(upload.single("images"), designuploadValidaton, authorization, uploadDesign)
routers.route('/search').post(search_method)
routers.route('/view/upload').get(uploadDesignView)
routers.route('/view/userupload/:id').get(uploadedFileView).delete(uplodedfiledelete)





module.exports = routers