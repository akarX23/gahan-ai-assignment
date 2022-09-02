import { CredentialMailData } from 'helpers/types'

const attendanceReport = (data: CredentialMailData) => {
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
         Thank you for registering with us. Here are your credentials:
         <br>
         Username: ${data.to}
            <br>
            Password: ${data.password}
            <br>
        </body>
      </html>
      `
}

export default attendanceReport
