import * as mailgun from 'mailgun-js'

const mailerService = async ( token, name, email, mailType = 'invite' )=> {
// create reusable transporter object using the default SMTP transport
    const link= `${process.env.STAGING_URL}${token}`;

    const invite = `<table style="background-color:#f4f5f7;width: 100%; text-align: center; padding-bottom: 7%;">
    <thead>
    <tr>
        <th style="padding: 15px 0">
            <img height="200px" style="margin: 0 auto;display: block"
             src="https://i.ibb.co/60q32zC/email-Logo.png"
                 alt="logo"></th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>
            <table width="704" align="center" style="border-collapse: separate;background-color: #fff;border-radius: 8px;border-spacing: 25px 0;">

                <tr>
                    <td style="text-align: center;padding: 51px 0 15px;">
                        <span style="font-size: 28px;font-weight: 500; color: #404040;font-family: 'Poppins', sans-serif;letter-spacing: 0;line-height: 32px;">Project Collaboration Invite</span>
                    </td>

                </tr>

                <tr>
                    <td align="center" valign="top" style=" font-size: 16px; color: #404040; padding-bottom: 32px;font-family: 'Poppins', sans-serif;letter-spacing: 0;">

                        <p style="font-size: 14px;color: #404040;line-height: 1.74;padding: 0 50px 36px;text-align: center;margin: 0;font-family: 'Poppins', sans-serif;">
                            You have received a request to collaborate in a project with our existing user ${name} <br/><br/>Please click on below button to start Collaborating .</p>

                        <a href=${link} style="font-family: 'Poppins', sans-serif;display: inline-block; letter-spacing: 0; color: #fff;border-radius: 10px;padding: 23px 45px;min-width: 224px; line-height: 10px; font-size:18px;  text-decoration: none; background: #5C75AC;">Start Collaborating</a>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <p style="font-family: 'Poppins', sans-serif;letter-spacing: 0;color: #000000;font-size: 14px;margin-top: 7px; max-width: 410px; padding: 41px 28px 8px; border-top: 1px solid #F0F0F0;">
                            Need help? Contact us at  <a style="text-decoration: none;color: #5C75AC;" href="mailto:hello@rupeso.com">hello@collabspace.com</a></p>
                        <div style="padding: 0 0 43px;">
                            <a href="#" style="color: transparent;">
                                <img style="width: 34px; margin: 0 4px 0 0" src="https://i.ibb.co/ZYHTF6t/fb.png" alt="facebook">
                            </a>
                            <a href="#" style="color: transparent;">
                                <img style="width: 34px; margin: 0 4px"  src="https://i.ibb.co/ys5t1b5/twitter.png" alt="twitter">
                            </a>
                            <a href="#" style="color: transparent;">
                                <img style="width: 34px; margin: 0 4px"  src="https://i.ibb.co/kGzzbtb/play.png" alt="youtube">
                            </a>
                            <a href="#" style="color: transparent;">
                                <img style="width: 34px; margin: 0 0 0 4px" src="https://i.ibb.co/TwqqXwB/in.png" alt="linkedin">
                            </a>
                        </div>
                    </td>
                </tr>


            </table>
        </td>
    </tr>
    <tr>
        <td>
            <p style="font-size: 13px;color: #404040;padding: 14px 0;text-align: center;margin: 0;font-family: 'Poppins', sans-serif;word-spacing: -1px;">
                © 2021 CollabSpace. All rights reserved.</p>
        </td>
    </tr>
    </tbody>
</table>`;
    const resetPassword = `<table style="background-color:#f4f5f7;width: 100%; text-align: center; padding-bottom: 7%;">
    <thead>
    <tr>
        <th style="padding: 15px 0">
            <img height="200px" style="margin: 0 auto;display: block"
             src="https://i.ibb.co/60q32zC/email-Logo.png"
                 alt="logo"></th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>
            <table width="704" align="center" style="border-collapse: separate;background-color: #fff;border-radius: 8px;border-spacing: 25px 0;">

                <tr>
                    <td style="text-align: center;padding: 51px 0 15px;">
                        <span style="font-size: 28px;font-weight: 500; color: #404040;font-family: 'Poppins', sans-serif;letter-spacing: 0;line-height: 32px;">Reset Your Password</span>
                    </td>

                </tr>

                <tr>
                    <td align="center" valign="top" style=" font-size: 16px; color: #404040; padding-bottom: 32px;font-family: 'Poppins', sans-serif;letter-spacing: 0;">

                        <p style="font-size: 14px;color: #404040;line-height: 1.74;padding: 0 50px 36px;text-align: center;margin: 0;font-family: 'Poppins', sans-serif;">
                            Hi ! ${name}<br/>
                            You recently requested to change your password please click on the button below to reset it.
                            <br/>
                        <a href=${link} style="font-family: 'Poppins', sans-serif;display: inline-block; letter-spacing: 0; color: #fff;border-radius: 10px;padding: 23px 45px;min-width: 224px; line-height: 10px; font-size:18px;  text-decoration: none; background: #5C75AC;">Reset Password</a>
                        <br/>
                        <p>(For your own security, this link will expire after 10 min.)</p>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <p style="font-family: 'Poppins', sans-serif;letter-spacing: 0;color: #000000;font-size: 14px;margin-top: 7px; max-width: 410px; padding: 41px 28px 8px; border-top: 1px solid #F0F0F0;">
                            Need help? Contact us at  <a style="text-decoration: none;color: #5C75AC;" href="mailto:hello@rupeso.com">hello@collabspace.com</a></p>
                        <div style="padding: 0 0 43px;">
                            <a href="#" style="color: transparent;">
                                <img style="width: 34px; margin: 0 4px 0 0" src="https://i.ibb.co/ZYHTF6t/fb.png" alt="facebook">
                            </a>
                            <a href="#" style="color: transparent;">
                                <img style="width: 34px; margin: 0 4px"  src="https://i.ibb.co/ys5t1b5/twitter.png" alt="twitter">
                            </a>
                            <a href="#" style="color: transparent;">
                                <img style="width: 34px; margin: 0 4px"  src="https://i.ibb.co/kGzzbtb/play.png" alt="youtube">
                            </a>
                            <a href="#" style="color: transparent;">
                                <img style="width: 34px; margin: 0 0 0 4px" src="https://i.ibb.co/TwqqXwB/in.png" alt="linkedin">
                            </a>
                        </div>
                    </td>
                </tr>


            </table>
        </td>
    </tr>
    <tr>
        <td>
            <p style="font-size: 13px;color: #404040;padding: 14px 0;text-align: center;margin: 0;font-family: 'Poppins', sans-serif;word-spacing: -1px;">
                © 2021 CollabSpace. All rights reserved.</p>
        </td>
    </tr>
    </tbody>
</table>`;

    const mailOptions = {
        from: 'CollabSpace.subdomain@CollabSpace.com', // sender address
        to: email, // list of receivers
        subject: `Invite To Collaborate With ${name} 👋`, // Subject line
        html: invite // html body
    }

    const mailOptions2 = {
        from: 'CollabSpace.subdomain@CollabSpace.com', // sender address
        to: email, // list of receivers
        subject: `Reset Password of you CollabSpace Account ${name} ⁉️`, // Subject line
        html: resetPassword // html body
    }

    let myPromise = new Promise((resolve, reject)=> {
        const DOMAIN = 'sandboxf8af146244744fac8267f8a36fab610c.mailgun.org';
        const mg = mailgun({apiKey: '72578167609379be0c75b483ccbd9698-9776af14-42445fd6', domain: DOMAIN});
        console.log('===test===' , name, email, mailType)
        mg.messages().send(mailType==='invite'? mailOptions : mailOptions2, function (error, body) {
            if(error){
                reject(false);
                console.log(error);
            }
            console.log(body);
            resolve(true);
        });
    });
    return await myPromise;
}

export default mailerService
