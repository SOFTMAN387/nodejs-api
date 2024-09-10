import express from "express";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import cors from "cors";
import router from "./Routes/router.js"
dotenv.config();
const PORT=8000;
const app=express();


app.use(cors());
app.use(express.json());
app.use(router);
app.get("/",(req,res)=>{
    console.log("Hello World");
    res.status(200).send("Hello Manish");
})


const startServer=async()=>{
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(PORT,()=>{
            console.log(`Server has been started at port http://localhost:${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();