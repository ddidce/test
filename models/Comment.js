import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: "Text is Required"
    },
    createdAt: {
        type: Date,
        //현재 날짜 반환
        default: Date.now
    }
});

const model = mongoose.model("Comment", CommentSchema);
export default model;