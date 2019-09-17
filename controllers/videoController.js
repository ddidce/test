export const home = (req, res) => res.render("home"); //send대신 render사용시 views폴더에서 하일명이 home이고 확장자가pug인 템플릿파일을 찾음
export const search = (req, res) => res.render("Search");
export const videos = (req, res) => res.render("Videos");
export const upload = (req, res) => res.render("Upload");
export const videoDetail = (req, res) => res.render("Video Detail");
export const editVideo = (req, res) => res.render("Edit Video");
export const deleteVideo= (req, res) => res.render("Delete Video");