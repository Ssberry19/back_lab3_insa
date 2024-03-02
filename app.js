const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const multer = require('multer'); // Import multer

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Render the index.ejs file
app.get('/', (req, res) => {
    res.render('index', { message: '' });
});

// Set up bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Uploads folder where files will be stored
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Keep the original filename
    }
});


const upload = multer({ storage: storage });

// Handle form submission
// Handle form submission
app.post('/sendEmail', upload.array('attachments', 5), (req, res) => { // Use upload.array to handle multiple files
    const { recipient, subject, message } = req.body;
    const attachments = req.files || []; // If req.files is undefined, use an empty array

    // Validate input
    if (!recipient || !subject || !message) {
        return res.status(400).render('index', { message: 'All fields are required.' });
    }

    // Set up a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'insaniyatka@gmail.com',
            pass: 'ihih fijx nskv egkz'
        }
    });

    // Set up email configuration with attachments
    let mailOptions = {
        from: 'insaniyatka@gmail.com',
        to: recipient,
        subject: subject,
        text: message,
        attachments: attachments.map(file => ({ // Map uploaded files to attachments array
            filename: file.originalname,
            path: file.path
        }))
    };

    // Send email with attachments
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).render('index', { message: 'Error sending email. Please try again.' });
        } else {
            console.log('Email sent: ' + info.response);
            res.render('index', { message: 'Email sent successfully!' });
        }
    });
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('index', { message: 'Something went wrong on the server.' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
