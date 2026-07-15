import express from "express";
import Grade from "../models/Grade.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const grades = await Grade.find();
        res.json(grades);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.get("/", (req, res) => {
    res.send("Grades route working");
});

export default router;