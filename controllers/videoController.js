export const home = (req, res) => res.render("home", {pageTitle: "Home"}); //send대신 render사용시 views폴더에서 하일명이 home이고 확장자가pug인 템플릿파일을 찾음
export const search = (req, res) => {
    const {query : {term : searchingBy}} = req; //query : {term} = req.query.term
    res.render("search", {pageTitle: "Search", searchingBy});

}
export const videos = (req, res) =>
 res.render("videos", {pageTitle: "Videos"});

export const upload = (req, res) =>
 res.render("upload", {pageTitle: "Upload"});

export const videoDetail = (req, res) => 
res.render("video Detail", {pageTitle: "Video Detail"});

export const editVideo = (req, res) => 
res.render("edit Video", {pageTitle: "Edit Video"});

export const deleteVideo= (req, res) => 
res.render("delete Video", {pageTitle: "Delete Video"});