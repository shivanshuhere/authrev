import pdfDocument from "pdfkit";
import fs from "fs";
import crypto from "crypto";
import path from "path";

export async function test(req, res) {
    const doc = new pdfDocument();
    // doc.pipe(fs.createWriteStream("output.pdf"));
    // doc.text("Hello, World!");
    // doc.end();
    // res.send("PDF created");
    const { data } = req?.body;
    if (!data) return res.status(400).json({ message: "Data is required" });
    const fn = crypto.createHash("md5").update(data).digest("hex") + ".pdf";
    doc.pipe(fs.createWriteStream("public/pdf/" + fn));
    doc.pipe(res);
    doc.text(data);
    doc.end();
    res.sendFile(fn);
}
