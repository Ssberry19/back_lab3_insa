# Email Sender Application

This Node.js application allows users to send emails using a simple web interface. It utilizes the Nodemailer library for email sending functionality.

## Prerequisites

- Node.js installed on your machine
- A code editor (e.g., Visual Studio Code)

## Setup

1. Clone this repository to your local machine.

    git clone https://github.com/Ssberry19/back_lab3_insa.git
    Navigate to the project directory in your terminal.
    Run npm install to install the dependencies.
    Configuration
    Before using the application, you need to configure your email provider settings in the app.js file:

## javascript
    // Set up a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Enter your email address
            pass: 'your-password' // Enter your email password
        }
    });
    Replace 'your-email@gmail.com' with your email address and 'your-password' with your email password.

## Usage
    Start the application by running npm start or node app.js in your terminal.
    Open your web browser and navigate to http://localhost:5000.
    Fill out the email form with the recipient's email address, subject, message, and optionally attach files.
    Click the "Send Email" button to send the email.
## Error Handling
    If any required fields are missing or invalid, an error message will be displayed.
    If there's an error sending the email, an error message will be displayed.
    
## Additional Features
    You can customize the styling of the web interface by modifying the styles.css file.
    You can add additional functionality, such as authentication, logging, or more advanced email features supported by Nodemailer.
