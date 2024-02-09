require('dotenv').config();

const fs = require('fs');

const main = require('./src/gsheet');
const genPdf = require('./src/pdf');
const sendEmail = require('./src/email');
const getData = require('./src/api');

const optionsArr = [
    {
        from: 'spacenotes.com@gmail.com',
        to: 'spacenotes.com@gmail.com',
        subject: 'Test mail 1',
        text: 'Text message',
        html: 'HTML message',
        attachments: [
            {
                filename: 'invoice-1.pdf',
                content: fs.createReadStream(`${__dirname}/assets/invoices/invoice-1.pdf`)
            }
        ]
    }
];

const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=d8oCoiQeMF64bQWAaB70kQfDb8dfZuMetb1VqTKVSxB7MMLwftW-N0HX-rap77K0Tl3q-JgRal_VcwL-vB9tTC63_p8XhrJAm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNxOP-J1vgATTACPAvZRn_koIW92QIr-CaK_w3FJw3_C36naEwXEinhqJA64H1PEX6a3sYxkEcB8BZvBtuOqaC8md34wZdg7v9z9Jw9Md8uu&lib=MMGc38mtJFDtTk0B9EAlpa2rsuZPgfMh1';

async function run(){
    try {
        // const data = await main();
        // await genPdf(data);
        // const result = await sendEmail(optionsArr);
        const result = await getData(url);
        console.log(result.data);
    } catch (error) {
        console.error(error);
    }
}

run();