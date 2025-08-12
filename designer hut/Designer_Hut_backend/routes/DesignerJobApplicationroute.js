const express = require('express');
const { applyed_Job, recruiter_view } = require('../controller/DesignerJobApplication.controller');

const routers = express.Router()

routers.route('/applyjob').post(applyed_Job)
routers.route('/application_view').get(recruiter_view)

module.exports = routers  

