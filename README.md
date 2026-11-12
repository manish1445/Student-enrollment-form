# Student-enrollment-form

# Student Enrollment Form

## Description

The Student Enrollment Form is a small web-based project developed to store and manage student details using JsonPowerDB.

The form allows users to add new student records, search for existing records using Roll No, and update student information whenever required.

The project is developed using HTML, JavaScript, jQuery and Bootstrap. JsonPowerDB is used as the database to store student information.

The form contains the following fields:

- Roll No
- Full Name
- Class
- Birth Date
- Address
- Enrollment Date

Roll No is used as the primary key to identify each student record.

## Benefits of using JsonPowerDB

JsonPowerDB is used in this project because it makes database operations simple and easy to handle through API requests.

Some of its benefits are:

- **Simple to use:** It provides a straightforward way to store and retrieve data.
- **JSON support:** Data can be sent and received in JSON format.
- **Easy integration:** It can be connected to web applications using JavaScript and AJAX.
- **Less coding:** There is no need to write lengthy SQL queries for basic database operations.
- **Fast data retrieval:** Records can be searched using a primary key.
- **No separate backend required for this project:** The frontend communicates directly with the JsonPowerDB API.

## Scope of Functionalities

The project provides the following functionalities:

1. **Save:** Adds a new student record to JsonPowerDB.
2. **Search:** Checks whether a student record exists using Roll No.
3. **Update:** Allows changes to be made to an existing student record.
4. **Reset:** Clears the form and allows the user to enter another record.
5. **Validation:** Checks that all fields are filled before saving or updating.
6. **Primary Key:** Uses Roll No to identify students and avoid duplicate records.

## How the Application Works

When the application is opened, the form is initially reset and only the Roll No field is enabled.

The user enters a Roll No to check the database.

- If the Roll No is not found, the remaining fields are enabled so that a new student record can be entered and saved.
- If the Roll No already exists, the student's saved information is displayed. The Roll No field remains disabled, and the Update option becomes available.

After saving or updating a record, the form is reset for the next entry.





The following example shows how the application can be used:

1. Open the Student Enrollment Form in a browser.
2. Enter a Roll No, for example, `101`.
3. If the record does not exist, enter the student's details and click Save.
4. Enter the same Roll No again to retrieve the saved information.
5. Make changes to the required fields and click Update.
6. Use Reset to clear the form and start with another student.

## Technologies Used

- HTML
- JavaScript
- jQuery
- Bootstrap 3
- JsonPowerDB
- NetBeans IDE

## Database Details

| Property | Value |
|---|---|
| Database Name | Student |
| Relation Name | Student-Rel |
| Primary Key | Roll No |
| Database | JsonPowerDB |

## How to Run

1. Clone or download this repository from GitHub.
2. Open the project in NetBeans IDE.
3. Make sure `index.html` and `student.js` are in the same folder.
4. Open `student.js` and configure the JsonPowerDB connection token.
5. Check that the database name and relation name are set correctly.
6. Open `index.html` in Google Chrome or another web browser.
7. Enter a Roll No to start using the application.

## Project Status

The Student Enrollment Form has been developed with the main functionalities, including adding student records, searching for existing records, updating information and resetting the form.

## Release History

| Version | Description |
|---|---|
| v1.0.0 | Initial release of the Student Enrollment Form with JsonPowerDB integration. Includes Save, Update, Reset and student record lookup functionalities. |

## Sources

- [JsonPowerDB](http://login2explore.com)
- [Bootstrap Documentation](https://getbootstrap.com/docs/3.4/)
- [jQuery](https://jquery.com/)
- [GitHub Documentation](https://docs.github.com/)
