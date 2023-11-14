/**
 * Import the Patient model
 **/ 
const Patient = require('../../../models/patient');

/**
 * Controller method for retrieving reports of patients with a specific status 
 **/ 
module.exports.allReports = async function (req, res) {
    try {
        // Find patients with reports matching the specified status
        let patients = await Patient.find({ reports: { $elemMatch: { status: req.params.status } } });

        // Modify the patient list to include only relevant information
        const modifiedList = patients.map((item) => ({
            first_name: item.first_name,
            last_name: item.last_name,
            contact_name: item.contact_no,
            reports: item.reports.filter((ele) => ele.status === req.params.status)
        }));

        // Respond with a success message and the modified patient list
        return res.status(200).json({
            success: true,
            message: "Find the status",
            body: modifiedList
        });
    } catch (error) {
        // Handle internal server error
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
