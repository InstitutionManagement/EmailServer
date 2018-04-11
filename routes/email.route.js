const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
/*const fs = require('azure-storage-fs')
          .blob(_AuthConfig.blobConfig.user,
                _AuthConfig.blobConfig.key,
                _AuthConfig.blobConfig.container);*/
 

const _AuthConfig = require('../config/auth.config');


const emailRouter = express.Router();
var transporter = nodemailer.createTransport(_AuthConfig.smtpConfig);
  var mailOptions = {
    from: 'adarshadas@arsenic.com',
    attachments: []
  };
emailRouter.route('/')
.post((req, res, next) => {
  if(req.files !== null){
    Object.keys(req.files).forEach(element => {
      mailOptions.attachments.push({
        filename: req.files[element].name,
        content: req.files[element].data
      })
    });
  }
  mailOptions.to = req.body.To;
  mailOptions.subject = req.body.Subject;
  mailOptions.text = req.body.Text;
  transporter.sendMail(mailOptions, function(error, info){
    let dataout = {
      error : null,
      response: {}
    }
    if (error) {
      dataout.error = error;
      res.json(dataout);
    } else {
      dataout.response = info.response;
      res.json(dataout);
    }
  });   
});

module.exports = emailRouter;