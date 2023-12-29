const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
// Serve static files from 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Welcome to my website!');
});

// Nodemailer setup and route
app.post('/sendEmail', (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // Use environment variable for Gmail address
            pass: process.env.PASSWORD // Use environment variable for password or app password
        }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL, // recipient email
        subject: `New Contact Request from ${name}`,
        text: `You have received a new message from ${name} (${email}): ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.sendFile(__dirname + '/public/successResponse.html');
        }
    });
});

// Start server with dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
