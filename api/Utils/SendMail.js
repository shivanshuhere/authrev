import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 456,
    secure: true,
    auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.PASSWORD}`,
    },
});

export default transport;
