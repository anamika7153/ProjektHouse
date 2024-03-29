const nodemailer = require('nodemailer')
const { google } = require('googleapis')

exports.mailer = async (mail,otp) => {
    const oAuth2Client = new google.auth.OAuth2(process.env.OAUTH_CLIENTID, process.env.OAUTH_CLIENT_SECRET, process.env.REDIRECT_URI)
    oAuth2Client.setCredentials({refresh_token: process.env.OAUTH_REFRESH_TOKEN})
    // try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transporter = nodemailer.createTransport({
            // service: 'gmail',
            host: "smtp.gmail.com",
            // host: 'smtp.mailgun.org',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                // user: process.env.MAILGUN_SMTP_LOGIN,
                // pass: process.env.MAILGUN_SMTP_PASSWORD,
                user: process.env.MAIL_USERNAME,
                // pass: process.env.MAIL_PASSWORD,
                clientId: process.env.OAUTH_CLIENTID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                accessToken: accessToken
            }
        })
        
        var mailOptions ={
            from: 'PROJEKT HOUSE ✉️ projekt.house.ph@gmail.com',
            to: mail,
            subject: 'One Time Password (OTP) to reset your password',
            text: `OTP to reset your password is ${otp}. It will expire in 5 minutes.\n\nThank You.`
        }
        
        await transporter.sendMail(mailOptions, function(error, data) {
            if(error) {
                console.log(error)
            } else {
                // console.log('Email sent:'+data.response)
                console.log('Email sent')
            }
        })
        
    // } catch (error) {
    //     console.log(error)
    // }

}