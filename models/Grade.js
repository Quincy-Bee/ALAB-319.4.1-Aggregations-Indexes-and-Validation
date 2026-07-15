import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    class_id: {
        type: Number,
        required: true
    },

    learner_id: {
        type: Number,
        required: true
    },

    score: {
        type: Number,
        required: true
    }
});

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;