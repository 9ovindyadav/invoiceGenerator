require('dotenv').config();

const genPdf = require('./src/pdf');
const email = require('./src/email');
const getData = require('./src/api');

const url = process.env.GSHEET_URL;
const directory = `assets/invoices`;

async function run(){
    try {
        const res = await getData(url);
        const paths = await genPdf(res.data, directory);
        if(paths){
            console.log('Invoices generated');     
        }else{
            console.log('Error in invoice generation');
        }
        const result = await email(res.data, paths);
        if(result){
            console.log('All Email sent');
        }
    } catch (error) {
        console.error(error);
    }
}

run();