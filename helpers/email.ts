import nodemailer, { SendMailOptions } from 'nodemailer'
import { AllMailData, mailTemplates } from './types'
import credentialInvite from './mailTemplates/credentialsMail'
import otpMail from './mailTemplates/otpMail'

const getEmailData = (
  data: AllMailData,
  template: mailTemplates
): SendMailOptions => {
  let mailData: SendMailOptions = {
    from: `Quiz King ${process.env.SEND_MAIL}`,
    to: data.to,
  }

  switch (template) {
    case mailTemplates.credentials:
      mailData = {
        ...mailData,
        subject: 'Login Credentials',
        html: credentialInvite(data),
      }
      break
    case mailTemplates.otp:
      mailData = {
        ...mailData,
        subject: 'OTP for mail verification',
        html: otpMail(data),
      }
      break
    default:
      return mailData
  }

  return mailData
}

export const sendEmail = (
  data: AllMailData,
  template: mailTemplates,
  cb?: (error: Error) => void
) => {
  const smtpTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
      type: 'login',
    },
    service: 'gmail',
  })

  const mail = getEmailData(data, template)

  console.log(mail)

  smtpTransport.sendMail(mail, (err) => {
    if (err) {
      console.log(err)
      smtpTransport.close()
      if (cb) return cb(err)
    }
    console.log('sent')
    smtpTransport.close()
    if (cb) cb(null)
  })
}

// const sendEmails = async (dataList, template, cb) => {
//   const smtpTransport = nodemailer.createTransport({
//     host: process.env.SMTP_ENDPOINT,
//     secure: true,
//     auth: {
//       user: process.env.SMTP_USERNAME,
//       pass: process.env.SMTP_PASS,
//     },
//   })

//   await Promise.all(
//     dataList.map((data) => {
//       const mail = getEmailData(data, template)
//       console.log('Sent')
//       return smtpTransport.sendMail(mail)
//     })
//   ).catch((err) => {
//     console.log(err)
//     smtpTransport.close()
//     if (cb) return cb(err)
//   })

//   smtpTransport.close()
//   if (cb) return cb(null)
// }

// const sendEmailWithAttachment = async (data, template, cb) => {
//   const smtpTransport = nodemailer.createTransport({
//     host: process.env.SMTP_ENDPOINT,
//     secure: true,
//     auth: {
//       user: process.env.SMTP_USERNAME,
//       pass: process.env.SMTP_PASS,
//     },
//   })

//   const mail = getEmailData(data, template)

//   smtpTransport.sendMail(mail, (err) => {
//     if (err) console.log(err)
//     else console.log('sent')
//     smtpTransport.close()
//     if (cb) return cb()
//   })
// }
