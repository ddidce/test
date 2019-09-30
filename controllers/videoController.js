import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch(error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  } 
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
 
export const postUpload = async(req, res) => {
  const {
    body: {
      title,
      description
    },
    file : {path}
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  console.log(newVideo)
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: {id}
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", {pageTitle: video.title, video});
    //해당하는 비디오를 찾지못하면 홈으로 redirect
  } catch(error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
// res.render("videoDetail", {pageTitle: "Video Detail"});

export const getEditVideo = async(req, res) => {
  const {
    params: {id}
  } = req;

  try{
    const video = await Video.findById(id);
    res.render("editVideo", {pageTitle: `Edit ${video.title}`, video});
  } catch(error) {
    res.redirect(routes.home);
  }
}; 

export const postEditVideo = async(req, res) => {
  const {
    params: {id},
    body: {title, description}
  } = req;
  try {
    //업데이트하기위해서는 body부분에있는 값들을 가져와야해서 findoneandupdeate를 사용
    await Video.findOneAndUpdate({_id: id}, {title, description});
    res.redirect(routes.videoDetail(id));
  } catch(error) {
    res.redirect(routes.home);
  }
};

// Delete Video
export const deleteVideo= async (req, res) => {
  const {
    params: {id}
  } = req;

  try {
    await Video.findOneAndRemove({_id: id});
  } catch(error) {
  }
  res.redirect(routes.home);
};