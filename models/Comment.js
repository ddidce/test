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
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const model = mongoose.model("Comment", CommentSchema);
export default model;