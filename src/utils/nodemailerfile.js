const nodemailer = require('nodemailer');

const sendMailUtils = async(to,subject,text)=>{
    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:process.env.NODEMAILER_USER,
            pass:process.env.NODEMAILER_PASS,
        },
    });

    await transporter.sendMail({
        from:process.env.NODEMAILER_USER,
        to,
        subject,
        text,
    }).then(info => console.log('the response of the email ',info.response) );
};

module.exports = sendMailUtils;