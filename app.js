const express = require('express');
const app = express();

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Define routes here

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sendEmail', (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail', // or your email provider
        auth: {
            user: 'youremail@gmail.com', // your email
            pass: 'yourpassword' // your email password
        }
    });

    let mailOptions = {
        from: 'youremail@gmail.com',
        to: 'recipientemail@example.com', // recipient email
        subject: `New Contact Request from ${name}`,
        text: `You have received a new message from ${name} (${email}): ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error'); // if error occurs send error as response
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Sent Successfully'); // if email sent successfully send Sent Successfully as response
        }
    });
});