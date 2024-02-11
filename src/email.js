const fs = require('fs');
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

async function email(data, filePaths){
    const fromMail = process.env.FROM_EMAIL;
    const fromName = process.env.FROM_NAME;
    let counter = 0;
    const optionsArr = [];

    for(const user of data){
        const options = {
            from: fromMail,
            to: user['email'],
            subject: `Test mail for ${user['name']}`,
            text: `Hello ${user['name']} this is system generated mail from ${fromName} .`,
            html: `Hello ${user['name']} this is system generated mail from ${fromName} .`,
            attachments: [
                {
                    filename: 'invoice.pdf',
                    content: fs.createReadStream(`${filePaths[counter++]}`)
                }
            ]
        };

        optionsArr.push(options);
    }
    const result = await sendEmail(optionsArr);
    result.forEach((res) => {
        console.log(`Email sent to - ${res.accepted[0]}`);
    });
    return true;
}

module.exports = email;