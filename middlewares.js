import multer from "multer";
import routes from "./routes";

const multerVideo = multer({dest: "uploads/videos/"});

export const localsMiddelware = (req, res, next) => {
    res.locals.siteName = "Youtube";
    res.locals.routes = routes;
    //passport가 사용자를 로그인 시킬 때 user가 담긴
    //object를 리퀘스트 해주기 때문
    res.locals.user = req.user || null;
    console.log(req.user);
    next();
    //multer config과정

};
//single('videoFile')은 업로드 쪽에 파일이름을말함
export const uploadVideo = multerVideo.single("videoFile");

//multer과정
//미들웨어 작성 -> 뷰부분 작성(파일이름) -> router(post업로드쪽에 미들웨어추가)