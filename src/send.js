const express = require("express");
const helmet = require('helmet');
const serverless = require("serverless-http");
const creds = require('./config');
var nodemailer = require('nodemailer');
const cors = require("cors");
const app = express();
app.use(helmet());
const router = express.Router();
const bodyParser = require("body-parser");
// const { USER_VALUE, PASS_VALUE } = process.env

var transport = {
    host: 'smtp.gmail.com', // Don’t forget to replace with the SMTP host of your provider
    port: 587,
    requireTLS: true,
    auth: {
    user: creds.USER, 
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

/* POST mail */
router.post('/', function(req, res, next) {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = ` <div><img src="https://pramithdev.xyz/logo.png" style="width:300px;" /></div>
                    <p>name: ${name}</p> 
                    <p>email: ${email}</p>
                    <p>message: ${message}</p> `

    var mail = {
        from: name,
        to: 'pcmax1989@gmail.com',  // Change to email address that you want to receive messages on
        subject: 'New Message from Contact Form',
        html: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: 'fail'
            });
        }
        else {
            res.json({
                status: 'success'
            });
            transporter.sendMail({
                from: "pramithdev.xyz",
                to: email,
                subject: "Submission was successful",
                html: ` <div> <img src="https://pramithdev.xyz/logo.png" style="width:300px;" /> </div>
                        <p> Thank you for contacting us! </p> 
                        <p> Form details </p> 
                        <p> Name: ${name} </p> 
                        <p> Email: ${email} </p> 
                        <p> Message: ${message} </p> `
            }, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Message sent: ' + info.response);
                }
            });
        }
        // transporter.close();
    })
})

app.use(cors());
//use body-parser to handle HTTP POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/.netlify/functions/send', router);

module.exports = app;
module.exports.handler = serverless(app);