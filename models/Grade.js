import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    student_id: {
        type: Number,
        required: true
    },

    class_id: {
        type: Number,
        required: true
    },

    scores: [
        {
            type: {
                type: String,
                required: true
            },

            score: {
                type: Number,
                required: true
            }
        }
    ]
});

//indexes added
gradeSchema.index({ class_id: 1 });

gradeSchema.index({ student_id: 1 });

gradeSchema.index({ student_id: 1, class_id: 1 });

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;