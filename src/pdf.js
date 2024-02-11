const fs = require('fs');
const { jsPDF } = require("jspdf");

function genPdf(data, directory){
    const keys = Object.keys(data[0]);

    let counter = 1;
    if(!fs.existsSync(directory)){
        fs.mkdirSync(directory, {recursive: true});
    }

    const paths = [];
    for(const user of data){
        
        const recordString = Object.entries(user)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
        const doc = new jsPDF();
        doc.text(recordString, 10, 10);
        const path = `${directory}/invoice-${counter++}.pdf`;
        doc.save(path);
        paths.push(path);
    }
    return paths;
}

module.exports = genPdf;