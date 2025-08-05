const express = require('express');
const upload = require('../middleware/multerConfig');
const { Designerjob, DesignerjobView, jobsremove, Jobview } = require('../controller/designerjobController');
const { designerjobValidation } = require('../middleware/userValidation');

const routers = express.Router()


routers.route('/postjob').post(upload.single("logo"),designerjobValidation, Designerjob )

routers.route('/view/postjob').get(DesignerjobView)

routers.route('/view/job/:id').get(Jobview).delete(jobsremove)


module.exports = routers;