'use strict'
const Mailchimp = require('mailchimp-api-v3')
const apiKey = '407089787e426a1c556e6f957e3c9c1b-us14';
const betaListId = '4263f4e212'
const mailchimp = new Mailchimp(apiKey);

const nodemailer = require('nodemailer');


function addSubscriber(request, callBack){
  let  newSubscriber = {
      "email_address": request.query.email,
      "status": "subscribed",
      "merge_fields": {
          "FNAME": request.query.first_name,
          "LNAME": request.query.last_name,
          "COMPANY": request.query.company
      }
  }
  mailchimp.post({
    path : '/lists/' + betaListId + '/members/',
    body: newSubscriber
  }, function (err, result) {
    if(err){
      return callBack('error', err)
    }
    return callBack('success', result);
  })
}

function contactSubscriber(request, callback){
  const transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
  const mailOptions = {
      from: request.query.name,
      to: request.query.email,
      subject: 'NEW SITE CONTACT',
      text: request.query.message
  };
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}


export { addSubscriber, contactSubscriber }
