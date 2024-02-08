const { jsPDF } = require("jspdf"); // will automatically load the node version

const doc = new jsPDF();
doc.text("Hello world!", 10, 10);
doc.save("a4.pdf");