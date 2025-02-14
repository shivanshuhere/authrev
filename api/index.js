import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import dbConnect from "./Db/index.js";
const app = express();

//middlewaer config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();

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

app.use("/api", authRoute);
