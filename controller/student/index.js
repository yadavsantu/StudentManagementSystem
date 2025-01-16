const db = require("./../../model/index")
const uploadFile = require("../../helper/multer-file-helper"); // Correct the path if necessary
const fs = require('fs');
const path = require('path');
const STUDENT = db.Student

exports.getAddStudent = (req, res) => {
    res.render("student/add-student");
}

// Handle file upload and store data
exports.postStudentData = async (req, res) => {
    try {
        // Use multer to handle file upload
        uploadFile(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            // Extract the uploaded file name
            const profileImage = req.file ? req.file.filename : null;

            // Create a new student entry with the data from the form
            await STUDENT.create({
                ...req.body,
                std_image: profileImage // Store the file name in the database
            });

            console.log(req.body, profileImage);
            res.send("Student information added successfully");
        });
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).send("Failed to add student");
    }
};

exports.getAllStudent = async (req, res) => {
    let data = await STUDENT.findAll()
    console.log("This is fina all data la")
    console.log(data)
    res.render('student/view-students', { data })
}


exports.deleteStudent = async (req, res) => {
    let data = await STUDENT.destroy({
        where: {
            id: req.params.id
        }
    })

    res.redirect('/all-students')
}

exports.getEditStudent = async (req, res) => {
    let data = await STUDENT.findByPk(req.params.id)
    if (data) {
        res.render('student/edit-student', {
            data: data
        })
    } else {
        res.send("Invalid ID")
    }

}

exports.updateStudent = async (req, res) => {
    try {
        // Use multer to handle file upload during update
        uploadFile(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            const studentId = req.params.id; // Get student ID from URL
            const profileImage = req.file ? req.file.filename : null; // Get the uploaded file name, if any

            // Prepare updated data (preserving the old image if no new image is uploaded)
            const updatedData = {
                ...req.body,
                std_image: profileImage ? profileImage : req.body.std_image // Preserve old image if no new one
            };

            // If a new image is uploaded, delete the old one
            if (profileImage && req.body.std_image) {
                const oldImagePath = path.join(__dirname, 'uploads', req.body.std_image);
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.error('Error deleting old image:', err);
                });
            }

            // Update the student information in the database
            const result = await STUDENT.update(updatedData, {
                where: {
                    id: studentId
                }
            });

            // If update is successful, redirect to the all-students page
            if (result[0] === 1) {
                res.redirect('/all-students');
            } else {
                res.status(404).send("Student not found");
            }
        });
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).send("Failed to update student");
    }
};


exports.addFine = async (req, res) => {
    let id = req.params.id;

    // Find the student by id
    let std_data = await STUDENT.findByPk(id);

    // Check if the student exists
    if (!std_data) {
        // If student doesn't exist, send a response or redirect
        return res.status(404).send('Student not found');
    }

    console.log(std_data);

    // Add the fine (ensure std_fees is a number before adding)
    let fine_added_fees = parseFloat(std_data.std_fees) + 100;

    // Update the student fees with the added fine
    await STUDENT.update(
        { std_fees: fine_added_fees },
        {
            where: { id: id }
        }
    );

    // Redirect to the "All Students" page
    res.redirect('/all-students');
};


exports.decreaseFine = async (req, res) => {
    let id = req.params.id

    let std_data = await STUDENT.findByPk(id)
    console.log(std_data)
    
    // Decrease fine by 100
    let fine_decreased_fees = parseFloat(std_data.std_fees) - 100

    // Update the student's fee after decreasing the fine
    let data = await STUDENT.update({ std_fees: fine_decreased_fees }, {
        where: {
            id: id,
        },
    })

    res.redirect('/all-students')
}
exports.applyDiscount = async (req, res) => {
    let id = req.params.id;

    // Fetch student data
    let std_data = await STUDENT.findByPk(id);
    if (!std_data) {
        return res.status(404).send('Student not found');
    }

    // Convert std_fees to a number (parse if it's in string format)
    let currentFees = parseFloat(std_data.std_fees);
    
    let newFees = currentFees;  // Default to no change

    // Apply discount based on the conditions
    if (currentFees >= 25000 && currentFees <= 40000) {
        // Apply 10% discount
        newFees = currentFees * 0.90; // 90% of current fees (10% discount)
    } else if (currentFees > 40000) {
        // Apply 25% discount
        newFees = currentFees * 0.75; // 75% of current fees (25% discount)
    }

    // Update the student's fee in the database
    await STUDENT.update(
        { std_fees: newFees }, 
        { where: { id: id } }
    );

    // Redirect or send a response
    res.redirect('/all-students');
}

