import PDFDocument from "pdfkit";
import fs from "fs";
import ApiResponse from "../Utils/ApiResponse.js";
import ErrorResponse from "../Utils/ErrorResponse.js";
import User from "../Models/user.model.js";
import transport from "../Utils/SendMail.js";
export function test(req, res) {
    try {
        const { data } = req?.body;
        if (!data)
            return res
                .status(400)
                .json(new ErrorResponse(400, "Data is required"));
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(`./public/pdf/${Date.now()}.pdf`));
        doc.text("data form user :", data);
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

export async function generatePdf(req, res) {
    try {
        const doc = new PDFDocument();

        // headers & send response headers
        res.setHeader(
            "Content-Disposition",
            'inline; filename="userDetails.pdf"'
        );
        res.setHeader("Content-Type", "Application/pdf");
        doc.pipe(res);

        // pdf doc formatting

        //heading
        doc.text("User Details", {
            align: "center",
            underline: true,
            fontSize: 20,
            bold: true,
            color: "#0066ff",
            italic: true,
            font: "Helvetica",
            fontStyle: "bold",
        });
        doc.moveDown();

        // user details
        const users = await User?.find();
        users.forEach((user) => {
            doc.text(`Name : ${user.username}`);
            doc.text(`Email :${user.email}`);
            doc.moveDown();
        });
        doc.moveDown();

        // not working
        /*
        img
        doc.image(
            "../public/imgages/upload/82949448bb396bbac7b95b04394d402d.jpg",
            doc.x,
            doc.y,
            {
                align: "center",
                valign: "center",
                height: 100,
                width: 100,
            }
        );
        */
        doc.moveDown();

        // footer
        doc.moveDown();
        doc.text("Thank you for using our service");
        doc.moveDown();
        doc.end();
    } catch (error) {
        console.error("Error generating PDF:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, "Error generating PDF"));
    }
}

export async function sendMail(req, res) {
    try {
        const options = {
            from: "ks7876555@gmail.com",
            to: "try.shivanshu@gmail.com",
            subject: "Test mail",
            text: "This is a test mail",
        };
        await transport.sendMail(options, (err, info) => {
            if (err) {
                console.log(err);
            }
            console.log(info);
            return res.status(200).json(new ApiResponse(200, "Mail sent"));
        });
    } catch (error) {
        console.log("error: ", error);
        return res
            .status(400)
            .json(
                new ErrorResponse(
                    400,
                    "Something went wrong while sending mail",
                    error
                )
            );
    }
}
