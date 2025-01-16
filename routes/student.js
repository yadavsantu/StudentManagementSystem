const express = require('express');
const routes =  express.Router();
const uploadFile = require('../helper/multer-file-helper'); // Import the file upload middleware
//controller calling
const studentController =  require('./../controller/student/index')

routes.get('/add-student', studentController.getAddStudent)
routes.get('/all-students', studentController.getAllStudent)
routes.get('/delete-student/:id', studentController.deleteStudent)
routes.get('/edit-student/:id', studentController.getEditStudent)
routes.get("/add-fine/:id", studentController.addFine)
routes.get("/decrease-fine/:id", studentController.decreaseFine)

routes.post('/save-student', studentController.postStudentData )
routes.post('/update-student/:id', studentController.updateStudent)


routes.get('/apply-discount/:id', studentController.applyDiscount);

// Route to add a student with an image upload
routes.post('/add-student', uploadFile, studentController.getAddStudent); // Use the uploadFile middleware here
module.exports = routes;