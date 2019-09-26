import { videos } from "../db";
import routes from "../routes";

export const home = (req, res) => {
    res.render("home", { pageTitle: "Home", videos });
  }; //send대신 render사용시 views폴더에서 하일명이 home이고 확장자가pug인 템플릿파일을 찾음

export const search = (req, res) => {
    const {
      query : {term : searchingBy}
    } = req; //query : {term} = req.query.term
    res.render("search", {pageTitle: "Search", searchingBy, videos});

}
// export const videos = (req, res) =>
//  res.render("videos", {pageTitle: "Videos"});

export const getUpload = (req, res) =>
 res.render("upload", {pageTitle: "Upload"});
export const postUpload = (req, res) => {
  const {
    body: {
      file,
      title,
      description
    }
  } = req;
  //To do : video Upload and save
  res.redirect(routes.videoDetail(324393));
};

export const videoDetail = (req, res) => 
res.render("videoDetail", {pageTitle: "Video Detail"});

export const editVideo = (req, res) => 
res.render("editVideo", {pageTitle: "Edit Video"});

export const deleteVideo= (req, res) => 
res.render("deleteVideo", {pageTitle: "Delete Video"});