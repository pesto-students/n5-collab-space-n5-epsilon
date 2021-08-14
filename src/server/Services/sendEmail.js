// const nodemailer = require("nodemailer");
import * as nodemailer from 'nodemailer'

const mailerService = async ( token, name )=> {
// create reusable transporter object using the default SMTP transport
    const link= `${process.env.LOCAL_URL}/auth/resetPassword?token=${token}`;
    const mailOptions = {
        from: 'ephraim.kunze3@ethereal.email', // sender address
        to: "himanshubhatia1996@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        html: `<table style="background-color: black;width: 100%; text-align: center; padding-bottom: 7%;">
    <thead>
    <tr>
        <th style="padding: 49px 0 21px;">
            <img width="230px" src='https://cypherchange.s3.us-east-2.amazonaws.com/cypherchangeLogo1' alt="Logo">
        </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>
            <table width="690" align="center" style="border-collapse: separate;background-color: #fff;border-radius: 8px;border-spacing: 25px 0;">
                <tr>
                    <td style="text-align: center;padding: 25px 0 42px;">
                        <img style=" display: block; margin: 0 auto 18px;" width="46" src='https://cypherchange.s3.us-east-2.amazonaws.com/mailicon' alt="image">
                        <div style="display: inline-block;">
                            <span style="font-size: 18px; color: #777777;font-family: 'Poppins', sans-serif;letter-spacing: 0;line-height: 32px;padding-bottom: 20px">
                                Verify email address</span>
                            <span style="width:100%; height: 2px;background: #707070;display: block"></span>
                        </div>
                    </td>

                </tr>
                <tr>
                    <td align="center" valign="top" style=" font-size: 16px; color: #777777; padding-bottom: 4px;font-family: 'Poppins', sans-serif;letter-spacing: 0;">

                        Welcome ! <span style="color: #000;font-family: 'Poppins', sans-serif;letter-spacing: 0;">${name}</span>
                        <p style=" font-size: 14px; color: #777777; padding: 0 135px 32px; text-align: center; line-height: 1.4; margin: 9px 0 13px;font-family: 'Poppins', sans-serif;letter-spacing: 0;">
                            Verify your email for ColabSpace account by clicking on the button below.</p>
                        <a style="font-family: 'Poppins', sans-serif;display: inline-block; letter-spacing: 0; color: #fff; border-radius: 4px; padding: 14px 17px; line-height: 10px; font-size:16px;  text-decoration: none; background: transparent linear-gradient(180deg, #9A5CFF 0%, #7892FF 100%) 0% 0% no-repeat padding-box;"
                           href=${link}>verify email address</a>

                    </td>
                </tr>
                <tr>
                    <td align="center">
                            <span style="font-family: 'Poppins', sans-serif;letter-spacing: 0;font-size:10px;color: #1E1E1E; padding: 11px 30px;">
                                (For your own security, this link will expire after 5 minutes.)
                            </span>
                        <p style="font-family: 'Poppins', sans-serif;letter-spacing: 0;color: #000000;font-size: 10px; padding: 9px 60px 8px;">
                            if its not you then please ignore this mail and we will delete the account</p>
                        <img style="margin: 0 auto 33px" width="100" src='https://cypherchange.s3.us-east-2.amazonaws.com/cypherchangeLogo2'
                             alt="logo">
                    </td>
                </tr>


            </table>
        </td>
    </tr>
    </tbody>
</table>`, // html body
    }

    let myPromise = new Promise((resolve, reject)=> {
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Failed to create a testing account. ' + err.message);
                reject(false);
                return process.exit(1);
            }

            console.log('Credentials obtained, sending message...');

            // Create a SMTP transporter object
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            // Message object

            transporter.sendMail(mailOptions , (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    reject(false);
                    return false;
                }

                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                resolve(true);
                return true;
            });
        });
    });
    return await myPromise;
}

export default mailerService
