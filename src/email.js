const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth:{
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
    }
});


async function sendEmail(optionsArr){
    try{
        const promises = optionsArr.map((options) =>{
            return new Promise((resolve, reject) =>{
                transporter.sendMail(options, (error, info) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(info);
                    }
                });
            });
        });

        const result = await Promise.all(promises);
        return result;
    }catch(error){
        console.log(error);
    }
}

module.exports = sendEmail;