/*
 * Import necessary modules and dependencies
 */
const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');


/* 
* Controller method for creating a new doctor 
*/

module.exports.createDoctor = async function (req, res) {
  // Validate password and confirmation match
  if (req.body.password !== req.body.confirm_password) {
    return res.status(400).send({
      "status_code": 400,
      "msg": "Password doesn't match. Please re-enter again.",
    });
  }

  // Validate mandatory fields for doctor creation
  if (
    req.body.first_name.trim().length === 0 ||
    req.body.email.trim().length < 8 ||
    req.body.speciality.trim().length < 3
  ) {
    return res.json(400, {
      message: "first_name, contact_no, email, speciality, password are mandatory fields."
    });
  }

  // Validate password length
  if (req.body.password.length < 8) {
    return res.json(400, {
      message: "Password should have at least 8 characters."
    });
  }

  // Validate contact number length
  if (
    req.body.contact_no.toString().trim().length < 10 ||
    req.body.contact_no.toString().trim().length > 10
  ) {
    return res.json(400, {
      message: "contact_no should be of 10 digits without +91 and whitespaces."
    });
  }

  try {
    // Check if a doctor with the provided email already exists
    const existingDoctor = await Doctor.findOne({ email: req.body.email });
    if (existingDoctor !== null) {
      return res.status(400).send({
        "status_code": 400,
        "msg": "User with the email address provided already exists.",
      });
    }

    // Create a new doctor with the provided information
    const newDoctor = await Doctor.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      contact_no: req.body.contact_no,
      email: req.body.email,
      speciality: req.body.speciality,
      password: req.body.password,
    });

    // Return success message with reference ID
    return res.status(200).send({
      "reference_id": newDoctor.id,
      "msg": "Doctor has been created",
    }).end();
  } catch (error) {
    // Handle internal server error
    res.status(500).send({
      "msg": "Internal Server Error",
    });
  }
};

/*
* Controller method for creating a new session (sign-in) with JWT
*/
module.exports.createSession = async function(req, res) {
  try {
    // Find the doctor with the provided email for authentication
    let doctor = await Doctor.findOne({ email: req.body.email });

    // Check if the doctor exists and if the password is correct
    if (!doctor || doctor.password !== req.body.password) {
      return res.json(422, {
        message: "Invalid email address or password"
      });
    }

    // Return success message with a JWT token for authentication
    return res.json(200, {
      message: 'Sign in successful, here is your token, please keep it safe!',
      data: {
        token: jwt.sign(doctor.toJSON(), 'doctorAPI', {
          expiresIn: '100000000'
        })
      }
    });

  } catch (err) {
    // Handle internal server error
    return res.json(500, {
      message: "Internal Server Error"
    });
  }
};
