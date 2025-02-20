import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import dbConnect from "./Db/index.js";
import cors from "cors";
const app = express();

//middlewaer config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 8080;
dbConnect()
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log("Server started at port http://localhost:" + PORT);
        });
    })
    .catch((err) => {
        console.log("Database connection failed, error: " + err);
    });

//routes
import authRoute from "./Routes/auth.routes.js";
import testRoutes from "./Routes/test.routes.js";
app.use("/api", authRoute);

// test pdfkit
app.use("/test", testRoutes);
