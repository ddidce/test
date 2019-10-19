import mongoose from "mongoose";


//video model
const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: "File URL is required"
    },
    title: {
        type: String,
        required: "Title is required"
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        //현재 날짜 반환
        default: Date.now
    },
    comments: [{
        //objectid에게 ref로 어느 모델에서 온건지 알려줘야함
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

//model 이름은 Video / Video model 의 schema는 VideoSchema
const model = mongoose.model("Video", VideoSchema);
export default model;