const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs').promises;

async function genPdf(data, directory){
    let counter = 1;
    
    const paths = [];
    for(const user of data){    
        const path = `${directory}/invoice-${counter++}.pdf`;
        const template = 'assets/receiptTemplate.pdf';
        await genInvoice(template, path, user);
        paths.push(path);
    }
    return paths;
}

async function genInvoice(template, output,user) {
    try {
        const templateBytes = await fs.readFile(template);
        const pdfDoc = await PDFDocument.load(templateBytes)
        
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Courier)
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        
        const { width, height } = firstPage.getSize()
        const fontSize = 20;
        firstPage.drawText(user.sno, {
          x: 120,
          y: 507,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0)
        })

        firstPage.drawText(user.date, {
            x: 445,
            y: 507,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

        firstPage.drawText(user.name, {
            x: 170,
            y: 452,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

        firstPage.drawText(user.college, {
            x: 170,
            y: 402,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0, 0, 0)
        })

        firstPage.drawText(user.event, {
            x: 148,
            y: 305,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0, 0.1, 0.1)
        })

        firstPage.drawText(`${user.amount}/-`, {
            x: 100,
            y: 210,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0, 0, 0)
        })
        
        const pdfBytes = await pdfDoc.save()
        await fs.writeFile(output, pdfBytes);
    } catch (error) {
        console.error('Error generating invoice PDF:', error);
    }
}

module.exports = genPdf;