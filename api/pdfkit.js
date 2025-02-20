import PDFDocument from "pdfkit";
import fs from "fs";
const doc = new PDFDocument();
doc.pipe(fs.createWriteStream(`./pdf/${Date.now()}.pdf`));
doc.text("this is test");
doc.end();
// console.log(doc);
console.log("pdf created");
