const express = require('express');
const upload = require('../middleware/multerConfig');
const { Designerjob, DesignerjobView } = require('../controller/designerjobController');
const { designerjobValidation } = require('../middleware/userValidation');

const routers = express.Router()


routers.route('/postjob').post(upload.single("logo"),designerjobValidation, Designerjob )
routers.route('/view/postjob').get(DesignerjobView)


module.exports = routers;