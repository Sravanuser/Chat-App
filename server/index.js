import { app, server } from "./Socket/Socket.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import cookieparser from "cookie-parser";
import mongoose from "mongoose";
import AuthRoutes from "./Router/AuthRoutes.js";
import MessageRoutes from "./Router/MessageRoutes.js";
import UserRoutes from "./Router/UserRoute.js";

let dirname = path.resolve();
app.use(express.json({
    limit: "50mb"
}));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieparser());
app.use("/auth", AuthRoutes);
app.use("/message", MessageRoutes);
app.use("/user", UserRoutes);
app.use(express.static(path.join(dirname, "/client/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.join(dirname, "client", "dist", "index.html"))
})
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL)
    .then(() => { console.log("Connected to mongoDB") })
    .catch((err) => { console.log(err.message) })

server.listen(PORT, () => {
    console.log(`Server running at port : ${PORT}`);
})