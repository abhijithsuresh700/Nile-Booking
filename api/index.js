import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import hotelRoute from "./routes/hotelRoute.js"
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import roomRoute from "./routes/roomRoute.js"
import bookingRoute from "./routes/bookingRoute.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();




//MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/hotel", hotelRoute)
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/room", roomRoute)
app.use("/api/booking", bookingRoute)









const connect =async()=>{
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("An error occured at the database connection")
        throw error;
    }    
}



app.listen(8880, ()=>{
    connect();
    console.log("Server listening on port 8880")
})