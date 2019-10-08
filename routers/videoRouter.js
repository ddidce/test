import express from "express";
import routes from "../routes";
import {
    videos,
    getUpload,
    postUpload,
    
    videoDetail,

    getEditVideo,
    postEditVideo,
    
    deleteVideo,
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

// videoRouter.get(routes.videos, videos);
// Upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);


// Delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;


// 라우터부분 - 파일 업로드시
// 미들웨어 - folder(video/)에 업로드
// 라우터로가서 - postupload라는 함수는 해당 file에 접근
// 컨트롤러부분 - postUpload에 file에 접근 URL방식으로