import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import gradesRouter from "./routes/grades.js";

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use("/grades", gradesRouter);


mongoose.connect(process.env.URI)
    .then(async () => {
        console.log("MongoDB connected");

        // Create/sync indexes from Grade model
        await mongoose.connection.syncIndexes();

        console.log("Indexes synced");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });