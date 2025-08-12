const express = require('express');
const upload = require('../middleware/multerConfig');
const { Designerjob, DesignerjobView, jobsremove, Jobview } = require('../controller/designerjobController');
const { designerjobValidation } = require('../middleware/userValidation');
const { authorization } = require('../middleware/authorization');


const routers = express.Router()

routers.route('/postjob').post(upload.single("logo"),designerjobValidation,authorization, Designerjob )

routers.route('/view/postjob').get(DesignerjobView)

routers.route('/view/job').get(authorization,Jobview).delete(authorization,jobsremove)

module.exports = routers;