import PDFDocument from "pdfkit";
import fs from "fs";
import ApiResponse from "../Utils/ApiResponse.js";
import ErrorResponse from "../Utils/ErrorResponse.js";

export async function test(req, res) {
    try {
        const { data } = req?.body;
        if (!data)
            return res
                .status(400)
                .json(new ErrorResponse(400, "Data is required"));
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(`../public/pdf/${Date.now()}.pdf`));
        doc.text(data);
        doc.end();
        console.log("pdf created");
        return res.status(200).json(new ApiResponse(200, "PDF created"));
    } catch (error) {
        console.log("failed to create pdf :", error);

        return res
            .status(400)
            .json(new ErrorResponse(400, "failed to create pdf", error));
    }
}
