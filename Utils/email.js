const nodemailer = require('nodemailer');

const sendEmail = async (option) =>{
    //Create a transporter
    // const transporter = nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASSWORD
    //     }
    // })

    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "03bea486e3689a",
          pass: "9e7d0feb1afa1d"
        }
      });

    //Define email options
    const emailOptions = {
        from : 'Cineflix support<support@cineflix.com',
        to: option.email,
        subject: option.subject,
        text: option.message
    }

    await transporter.sendMail(emailOptions);
}

module.exports= sendEmail;