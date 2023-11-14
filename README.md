# Hospital API
The application uses Express.js for the server, MongoDB for data storage, and JSON Web Tokens (JWT) for authentication.

#Table of Contents
>[Features]
>[Installation]
>[Usage]
>[API Documentation]
>[Folder Structure]
>[Dependencies]
>[Contributing]

#Features
##Doctor Management:
>Register a new doctor.
>Sign in a doctor with JWT authentication.

##Patient Management:
>Register a new patient.
>Create medical reports for patients.
>Retrieve all reports of a specific patient.

##Report Management:
>Retrieve reports of patients with a specific status.


#Installation
>Clone the Repository:
git clone https://github.com/your-username/healthcare-management-system.git
cd healthcare-management-system

>Install Dependencies:
npm install

>Configure MongoDB:
Set up a MongoDB database.
Update the connection string in the config.js file.

>Start the Application:
npm start
The application will be running at http://localhost:8000 by default.


#Usage
##Doctor Registration:
Endpoint: POST /doctors/register
Create a new doctor account by providing required details.

##Doctor Sign-in:
Endpoint: POST /doctors/sign-in
Sign in as a doctor to obtain a JWT token for authentication.

##Patient Registration:
Endpoint: POST /patients/register
Register a new patient by providing necessary details.

##Create Patient Report:
Endpoint: POST /patients/:id/create_report
Create a new medical report for a specific patient.

##Retrieve All Reports of a Patient:
Endpoint: GET /patients/:id/all_reports
Get all medical reports of a specific patient.

##Retrieve Reports by Status:
Endpoint: GET /reports/:status
Retrieve reports of patients with a specific status.

#API Documentation
This repository contains the implementation of controllers and routes for managing doctors, patients, and reports in a healthcare application. The controllers are organized into separate files, and the routes are defined in corresponding router files.

Doctor Controller (controller/doctor.js)
1. Create Doctor
Endpoint: POST /api/v1/doctors/register
Description: Create a new doctor with the provided information.
Request Body:
first_name (string): First name of the doctor.
last_name (string): Last name of the doctor.
contact_no (string): Contact number of the doctor.
email (string): Email address of the doctor.
speciality (string): Specialization of the doctor.
password (string): Password for the doctor's account.
confirm_password (string): Confirmation of the password.
Response:
reference_id (string): Reference ID of the created doctor.
msg (string): Success message.
Error Responses:
400: Passwords do not match or mandatory fields are missing.
400: Invalid length of password or contact number.
400: User with the provided email already exists.
500: Internal Server Error.
2. Create Session (Sign-in) with JWT
Endpoint: POST /api/v1/doctors/sign-in
Description: Authenticate a doctor and generate a JWT token for subsequent requests.
Request Body:
email (string): Email address of the doctor.
password (string): Password for the doctor's account.
Response:
message (string): Success message.
data.token (string): JWT token for authentication.
Error Responses:
422: Invalid email address or password.
500: Internal Server Error.
Patient Controller (controller/patient.js)
1. Register Patient
Endpoint: POST /api/v1/patients/register
Description: Register a new patient with the provided information.
Request Body:
first_name (string): First name of the patient.
last_name (string): Last name of the patient.
contact_no (string): Contact number of the patient.
email_address (string): Email address of the patient.
temperature (string): Temperature of the patient.
Response:
reference_id (string): Reference ID of the created patient.
message (string): Success message.
Error Responses:
500: Internal Server Error.
2. Create Report
Endpoint: POST /api/v1/patients/:id/create_report
Description: Create a new medical report for a patient.
Request Parameters:
id (string): ID of the patient.
Request Body:
Report details (object): Report information.
Response:
success (boolean): Indicates if the operation was successful.
body (object): Updated patient details.
message (string): Success message.
Error Responses:
500: Internal Server Error.
3. Get All Reports of a Patient
Endpoint: GET /api/v1/patients/:id/all_reports
Description: Retrieve all medical reports of a specific patient.
Request Parameters:
id (string): ID of the patient.
Response:
message (string): Success message.
body (array): Array of patient reports.
Error Responses:
500: Internal Server Error.
Report Controller (controller/report.js)
1. All Reports with Specific Status
Endpoint: GET /api/v1/reports/:status
Description: Retrieve reports of patients with a specific status.
Request Parameters:
status (string): Status to filter reports.
Response:
success (boolean): Indicates if the operation was successful.
message (string): Success message.
body (array): Modified list of patients with relevant information.
Error Responses:
500: Internal Server Error.
Router Files
1. Doctor Router (router/doctors.js)
Endpoints:
POST /api/v1/doctors/register: Register a new doctor.
POST /api/v1/doctors/sign-in: Sign in a doctor.
2. Patient Router (router/patients.js)
Endpoints:
POST /api/v1/patients/register: Register a new patient.
POST /api/v1/patients/:id/create_report: Create a new report for a patient.
GET /api/v1/patients/:id/all_reports: Get all reports of a patient.
3. Report Router (router/reports.js)
Endpoints:
GET /api/v1/reports/:status: Get reports according to the status filter.



Folder Structure
config: Configuration files.
controller: Controller logic for handling requests.
models: MongoDB data models.
router: Express routers for defining routes.
app.js: Main application file.
config.js: Configuration settings.
API_DOCUMENTATION.md: API documentation file.
Dependencies
Express.js: Web application framework.
Mongoose: MongoDB object modeling tool.
JSON Web Token (jsonwebtoken): Token-based authentication.
Contributing
Contributions are welcome! If you find a bug or have suggestions, please open an issue. Pull requests are also appreciated.

License
This project is licensed under the MIT License.
