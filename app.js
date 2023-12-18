const express = require('express');
const app = express();

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
// Example of a root route

// Serve static files (e.g., HTML, CSS, JS) from a 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Welcome to my website!');
});

// Define routes here

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const nodemailer = require('nodemailer');

app.post('/sendEmail', (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ass4shift@gmail.com', // Your Gmail address
            pass: 'vvhg udkn sbhe stgx'      // Your App Password or regular password
        }
    });
    

    let mailOptions = {
        from: 'ass4shift@gmail.com',
        to: 'ass4shift@gmail.com', // recipient email
        subject: `New Contact Request from ${name}`,
        text: `You have received a new message from ${name} (${email}): ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error'); // if error occurs send error as response
        } else {
            console.log('Email sent: ' + info.response);
            res.sendFile(__dirname + '/public/successResponse.html'); // Send HTML file on success
        }
    });
});