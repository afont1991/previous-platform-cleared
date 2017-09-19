import rp from 'request-promise'

export function SendEmail(parties, message, extra){
  let emailOptions = {
    "key": process.env.MANDRILL_API_KEY,
    "message": {
      "text": message.text,
      "subject": message.subject,
      "from_email": parties.from.email,
      "from_name": parties.from.name,
      "to": [
        {
          "email": parties.to.email,
          "name": parties.to.name,
          "type": "to"
        }
      ],
      "headers": {
        "Reply-To": (extra && extra.replyTo ? extra.replyTo : "info@debtmaven.com")
      },
      "bcc_address": (extra && extra.bcc ? extra.bcc : null)
    },
  }
  let requestOptions = {
      method: 'POST',
      uri: 'https://mandrillapp.com/api/1.0/messages/send.json',
      body: emailOptions,
      json: true,
  };
  return rp(requestOptions).then(function (response) {
    return true
  }).catch(function (err) {
    console.log(err)
    throw err
  });
}
