const nodemailer = require('nodemailer');

const sendMailUtils = async(to,subject,text)=>{
    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:"vishalsinhparmar821@gmail.com",
            pass:"solr dzul ouvj rwun",
        },
    });

    await transporter.sendMail({
        from:"vishalsinhparmar821@gmail.com",
        to,
        subject,
        text,
    }).then(info => console.log('the response of the email ',info.response) );
};

module.exports = sendMailUtils;