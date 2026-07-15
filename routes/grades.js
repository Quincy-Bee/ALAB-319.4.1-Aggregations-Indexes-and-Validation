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


router.get("/stats", async (req, res) => {
    try {
        const stats = await Grade.aggregate([
            {
                $unwind: "$scores"
            },
            {
                $group: {
                    _id: "$student_id",
                    average: {
                        $avg: "$scores.score"
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalLearners: {
                        $sum: 1
                    },
                    learnersAbove70: {
                        $sum: {
                            $cond: [
                                {
                                    $gt: ["$average", 70]
                                },
                                1,
                                0
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalLearners: 1,
                    learnersAbove70: 1,
                    percentageAbove70: {
                        $multiply: [
                            {
                                $divide: [
                                    "$learnersAbove70",
                                    "$totalLearners"
                                ]
                            },
                            100
                        ]
                    }
                }
            }
        ]);

        res.json(stats);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


export default router;