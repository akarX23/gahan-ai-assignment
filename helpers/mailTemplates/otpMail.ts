import { OtpMailData } from 'helpers/types'

const attendanceReport = (data: OtpMailData) => {
  return `<!DOCTYPE html>
      <html>
        <head>
         
          <style>
           
            p {
              font-size: 18px;
              color: black;
            }
      
          </style>
          <title>Document</title>
        </head>
        <body>
         <p>Hello ${data.name},</p>
         Your OTP is ${data.otp}
        </body>
      </html>
      `
}

export default attendanceReport
