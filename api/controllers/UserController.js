require('dotenv').config()

import responseHandler from '../helpers/responseHelper';
import crypto from 'crypto'
import moment from 'moment'
import rp from 'request-promise'
import * as ErrorHandler from '../helpers/errorHandler.js'
import * as EmailHelper from '../helpers/emailHelper.js'

export function createUser(req, res){
  const UserForm = req.body.formData;
  const newUser = {
    email: UserForm.email.value,
    password: crypto.createHash('sha256').update(UserForm.password.value).digest('hex'),
    type: UserForm.user_type.selectedOption.value,
    first_name: UserForm.first_name.value,
    last_name: UserForm.last_name.value,
  };
  global.database.User.findOne({where: {id: req.user.get().id}}).then((authUserResult)=>{
    if(!authUserResult.get().admin){
      throw 'Non admin';
    }
    return global.database.User.create(newUser)
  }).then((newSavedUser)=>{
    return responseHandler(res, 'Success', []);
  }).catch((err) => {
    const NewError = {
      type: 'User',
      reason: 'Error creating user',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error creating user', err);
  })
}

export function userInfo(req, res){
  let userInfo = req.user.get()
  delete userInfo.password;
  return responseHandler(res, 'Success', userInfo);
}

export function accountInit(req, res){
  let UserInfo = req.user.get()
  req.user.getCompany().then((CompanyInstance)=>{
    if(!CompanyInstance){throw 'No Company Found'}
    UserInfo.company = CompanyInstance.toJSON()
    return responseHandler(res, 'Success', UserInfo);
  }).catch((err)=>{
    const NewError = {
      type: 'User',
      reason: 'Error getting account information',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error getting account information', err);
  })
}

export function edit(req, res){
  let updateQuery = {}
  let findQuery = {where: {id: req.user.get().id}}
  if(req.body.email){
    updateQuery = {email: req.body.email}
  } else if(req.body.password){
    updateQuery = {password: crypto.createHash('sha256').update(req.body.password.password.value).digest('hex')}
  }
  global.database.User.update(updateQuery, findQuery).then((Updated)=>{
    return responseHandler(res, 'Success', []);
  }).catch(()=>{
    const NewError = {
      type: 'User',
      reason: 'Error editing account',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error editing account', err);
  })
}

export function registerUser(req, res){
  let companyData = JSON.parse(req.body.formData);
  let CompanyId;
  const UserForm = companyData.newUser
  const newUser = {
    email: UserForm.email.value,
    password: crypto.createHash('sha256').update(UserForm.password.value).digest('hex'),
    type: companyData.company_overview.platform_type.selectedOption.value,
    first_name: UserForm.first_name.value,
    last_name: UserForm.last_name.value,
  };
  global.database.User.findOne({where: {email: UserForm.email.value}}).then((userInstance)=>{
    let userStatus = false
    if(userInstance){
      return Promise.reject('duplicate')
    }
    return global.database.User.create(newUser)
  }).then((newUserInstance) =>{

    let operatingTypes = companyData.company_overview.operating_type.selectedOption.map((type)=>{
      return type.value
    })
    const formattedtoperatingTypes = operatingTypes.join(', ')

    let newCompany = {
      UserId: newUserInstance.get().id,
      name: companyData.company_overview.company_name.value,
      operating_type: formattedtoperatingTypes,
      platform_type: companyData.company_overview.platform_type.selectedOption.value,
      description: companyData.company_overview.company_description.value,
      url: companyData.company_overview.company_url.value,
      founding_year: companyData.company_overview.founding_year.value,
      country: companyData.company_overview.country.selectedOption.value,
      state: companyData.company_overview.state.selectedOption.value,
      city: companyData.company_overview.city.value,
      platform_status: 'inactive',
      open_fund: companyData.key_metrics.open_fund.value,
      aum: parseFloat(companyData.key_metrics.aum.value),
      active_investments: (companyData.key_metrics.active_investments.selectedOption && companyData.key_metrics.active_investments.selectedOption.value ? companyData.key_metrics.active_investments.selectedOption.value : null) ,
    }
    let companyType = newCompany.platform_type;
    return global.database.Company.create(newCompany)
  }).then((savedCompany) =>{
    CompanyId = savedCompany.get().id;
    if(!req.files || !req.files.logo){
      return Promise.resolve();
    }
    const S3Params = {
      Bucket: 'debt-maven-public',
      Key: `company-logo-id-${CompanyId}`,
      Body: req.files.logo.data,
      ContentType: req.files.logo.mimetype
    }
    return global.S3.putObject(S3Params).promise()
  }).then((s3Response)=>{
    if(!req.files || !req.files.logo){
      return Promise.resolve();
    }
    const logo_url = `https://s3.amazonaws.com/debt-maven-public/company-logo-id-${CompanyId}`
    const updateCompany = {
      logo_url: logo_url
    }
    let updateFindCompany = {
      where: {
        id: CompanyId
      }
    }
    return global.database.Company.update(updateCompany, updateFindCompany)
  }).then((UpdatedCompany)=>{
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
      subject: "New User Registered",
      text: `Yo got dat new user! Email: ${newUser.email} Company Name: ${companyData.company_overview.company_name.value}`
    }
    return EmailHelper.SendEmail(recipients, message)
  }).then((emailResponse)=>{
    return responseHandler(res, 'Success', {CompanyId: CompanyId});
  }).catch((err)=>{
    console.log(err);
    if(err === 'duplicate'){
      return responseHandler(res, 'Success', 'duplicate');
    } else {
      const NewError = {
        type: 'User',
        reason: 'Error with public user registration',
        details: JSON.stringify(err),
        UserId: null
      }
      ErrorHandler.LogError(NewError)
      return responseHandler(res, 'Error', 'Error with public user registration', err);
    }
  });
}

export function ForgotPasswordRequest(req, res){
  let passwordToken = crypto.randomBytes(32).toString('hex')
  global.database.User.findOne({where: {email: req.query.email}}).then((userInstance) =>{
    if(!userInstance){
      return Promise.resolve('done')
    } else {
      let newToken = {
        UserId: userInstance.get().id,
        token: passwordToken,
      }
      return global.database.ResetToken.create(newToken)
    }
  }).then((createdToken)=>{
    if(createdToken === 'done'){
      return Promise.resolve('done')
    } else {
      let forgotPasswordEmail = {
        "key": process.env.MANDRILL_API_KEY,
        "message": {
          "text": `Reset your password at the following link https://platform.debtmaven.com/forgot/${passwordToken}`,
          "subject": "Password Reset",
          "from_email": "info@debtmaven.com",
          "from_name": "DebtMaven",
          "to": [
            {
              "email": req.query.email,
              "name": req.query.email,
              "type": "to"
            }
          ],
          "headers": {
            "Reply-To": "info@debtmaven.com"
          },
        },
      }
      let requestOptions = {
          method: 'POST',
          uri: 'https://mandrillapp.com/api/1.0/messages/send.json',
          body: forgotPasswordEmail,
          json: true,
      };
      return rp(requestOptions)
    }
  }).then((mandrilResponse) => {
    return responseHandler(res, 'Success');
  }).catch((err)=>{
    const NewError = {
      type: 'User',
      reason: 'Error with password reset',
      details: JSON.stringify(err),
      UserId: null,
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error with public user registration', err);
  });
}

export function ForgotPasswordUpdate(req, res){
  let UserId;
  let currentTime = moment();
  let cutOffTime = moment().subtract(10, 'm');
  let expirationQuery = {
    $gte: cutOffTime,
    $lte: currentTime,
  }
  global.database.ResetToken.findOne({where: {used: false, token: req.body.token, createdAt: expirationQuery}}).then((tokenInstance) =>{
    if(!tokenInstance){
      throw 'Invalid Password Reset Request'
    } else {
      let newPassword = {
        password: crypto.createHash('sha256').update(req.body.rePassword_1.value).digest('hex'),
      }
      let findUserQuery = {
        where: {
          id: tokenInstance.get().UserId,
        },
      }
      UserId = tokenInstance.get().UserId
      return global.database.User.update(newPassword, findUserQuery)
    }
  }).then((updateUserInstance)=>{
    let tokenQuery = {
      where: {
        token: req.body.token,
        UserId: UserId,
      }
    }
    let updateToken = {
      used: true,
    }
    return global.database.ResetToken.update(updateToken, tokenQuery)
  }).then((updatedTokenInstance) => {
    return responseHandler(res, 'Success');
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'User',
      reason: 'Error with password reset',
      details: JSON.stringify(err),
      UserId: null,
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error with public user registration', err);
  });
}

export function signTerms(req, res){
  let updateUser = {
    signed_terms: true,
  }
  let userQuery = {
    where: {
      id: req.user.get().id,
    },
  }
  global.database.User.update(updateUser, userQuery).then((userInstance) => {
    return responseHandler(res, 'Success');
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'User',
      reason: 'Error signing terms of service',
      details: JSON.stringify(err),
      UserId: req.user.get().id,
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error signing terms of service', err);
  });
}

export function helpMessage(req, res){

  let email = req.body.email.value
  let message = req.body.message.value

  let userName = `${req.user.get().first_name} ${req.user.get().last_name}`
  let userCompanyName = req.user.toJSON().Company.name

  let newSupportRequesy = {
    email: email,
    message: message,
    UserId: req.user.get().id
  }

  global.database.SupportRequest.create(newSupportRequesy).then((supportCreateResponse) => {
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
      subject: `Support Request From: ${userName} of ${userCompanyName}`,
      text: `${userName} of ${userCompanyName} | question: ${message} |  reply to this email: ${email}`
    }
    return EmailHelper.SendEmail(recipients, message)
  }).then((emailResponse)=>{
    let recipients = {
      to: {
        email: email,
        name: userName,
      },
      from: {
        name: 'DebtMaven',
        email: 'admin@debtmaven.com',
      },
    }
    let message = {
      subject: `Debtmaven Support Request`,
      text: `This is to confirm that we have recieved your support request and will be reaching out shortly`,
    }
    return EmailHelper.SendEmail(recipients, message)
  }).then((emailResponse)=>{
    return responseHandler(res, 'Success');
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'User',
      reason: 'Error creating support request',
      details: JSON.stringify(err),
      UserId: req.user.get().id,
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error creating support request', err);
  });
}


export function checkEmail(req, res){
  global.database.User.findOne({where: {email: req.query.email}}).then((userInstance)=>{
    let userStatus = false
    if(userInstance){
      userStatus = true
    }
    return responseHandler(res, 'Success', userStatus);
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'User',
      reason: 'Error checking user email',
      details: JSON.stringify(err),
      UserId: null,
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error checking user email', err);
  })
}
