
import * as EmailHelper from  './emailHelper'

export function NewDeal(title, user) {
  const UserInfo = user.toJSON()

  let recipients = {
    to: {
      email: 'jordan@debtmaven.com',
      name: 'Jordan Selleck',
    },
    from: {
      name: 'DebtMaven',
      email: 'admin@debtmaven.com',
    },
  }
  let message = {
    subject: "New Deal",
    text: `New Deal Yo Title: ${title}, Sponsor: ${UserInfo.Company.name}, Email: ${UserInfo.email} `
  }
  return EmailHelper.SendEmail(recipients, message)
}
