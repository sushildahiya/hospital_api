/*
* Import necessary models
*/
const Patient = require('../../../models/patient');
const Doctor = require('../../../models/doctor');

/** 
 *  Controller method for registering a new patient
*/
module.exports.registerPatient = async function (req, res) {
  try {
    // Check if a patient with the provided contact number already exists
    const existingPatient = await Patient.findOne({ contact_no: req.body.contact_no });

    // If the patient exists, respond with existing patient details
    if (existingPatient !== null) {
      return res.json(200, {
        message: "Patient already registered.",
        data: {
          existingPatient: {
            _id: existingPatient._id,
            first_name: existingPatient.first_name,
            last_name: existingPatient.last_name,
            contact_no: existingPatient.contact_no,
            email_address: existingPatient.email_address,
            doctor: existingPatient.doctor,
            temperature: existingPatient.temperature,
            reports: existingPatient.reports
          }
        }
      });
    }

    // Create a new patient with the provided information
    const doctorNam = await Doctor.findOne({ _id: req.user._id });
    const newPatient = await Patient.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      contact_no: req.body.contact_no,
      email_address: req.body.email_address,
      doctor: `Dr. ${doctorNam.first_name.trim()} ${doctorNam.last_name.trim()}`,
      temperature: req.body.temperature,
      reports: []
    });

    // Respond with success message and reference ID
    return res.json(200, {
      reference_id: newPatient.id,
      message: "Patient has been registered",
    });
  } catch (error) {
    // Handle internal server error
    res.status(500).send({
      "msg": "Internal Server Error",
    });
  }
};

/**
 * Controller method for creating a new report for a patient
 **/ 
module.exports.createReport = async function (req, res) {
  try {
    // Find the patient by ID
    let patient = await Patient.findById(req.params.id);

    // Add the new report to the patient's reports array and save
    patient.reports.push(req.body);
    patient.save();

    // Respond with success message and the updated patient details
    return res.status(200).json({
      success: true,
      body: patient,
      message: "Report created successfully"
    });
  } catch (err) {
    // Handle internal server error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

/**
 * Controller method for retrieving all reports of a specific patient 
 * */ 
module.exports.getAllReportOfPatient = async function (req, res) {
  try {
    // Find the patient by ID
    const patient = await Patient.findById(req.params.id);

    // Respond with a success message and the patient's reports
    res.json(200, {
      message: `Following are all the reports of patient ${patient.first_name} ${patient.last_name}`,
      body: patient.reports
    });
  } catch (err) {
    // Handle internal server error
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
