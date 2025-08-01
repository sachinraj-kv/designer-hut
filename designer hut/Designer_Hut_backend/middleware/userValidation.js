const {body} = require('express-validator')


exports.registerValidation = [
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required'),
    body('password').notEmpty().withMessage('password is required ')
]

exports.loginValidaton = [
    body('email').notEmpty().withMessage('email is required'),
    body('password').notEmpty().withMessage('password is required')    
]

exports.designuploadValidaton = [
    body('title').notEmpty().withMessage('title is required'),
      body('about').notEmpty().withMessage('about is required'),
       body('category').notEmpty().withMessage('category is required'),
]

exports.designerjobValidation = [
    body('job_title').notEmpty().withMessage('job_title is required'),
    body('company_name').notEmpty().withMessage('company_name is required'),
    body('Description').notEmpty().withMessage('Description is required'),
    body('location').notEmpty().withMessage('location is required'),
    body('salary').notEmpty().withMessage(' salary is required'),
    body('contact_information.email').notEmpty().withMessage('contact information is required'),
    body('contact_information.phone').notEmpty().withMessage('contact information is required'),
    body('job_type').notEmpty().withMessage('job_type is required'),
    body('company_website').notEmpty().withMessage('company_website is required')
]