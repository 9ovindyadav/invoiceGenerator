const { jsPDF } = require("jspdf");

function genPdf(data){
    const keys = data[0];
    const dataWithoutKeys = data.slice(1);

    dataWithoutKeys.forEach((user,i) => {
        
        const record = {};
        keys.forEach((key,j) => {
            record[key] = user[j];
        });
    
    const recordString = Object.entries(record)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    const doc = new jsPDF();
    doc.text(recordString, 10, 10);
    doc.save(`assets/invoices/invoice-${i}.pdf`);
 })
}

module.exports = genPdf;