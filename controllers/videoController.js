import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    //sort -1을 주는 이유는 위 아래 순서를 바꾸겠다는 약속
    const videos = await Video.find({}).sort({
      _id: -1
    });
    res.render("home", {
      pageTitle: "Home",
      videos
    });
  } catch (error) {
    console.log(error);
    res.render("home", {
      pageTitle: "Home",
      videos: []
    });
  }
}; //send대신 render사용시 views폴더에서 하일명이 home이고 확장자가pug인 템플릿파일을 찾음

export const search = async (req, res) => {
  const {
    query: {
      term: searchingBy
    }
  } = req; //query : {term} = req.query.term
  let videos = [];
  try {
    // regex : 연관된 단어까지 찾아줌  option : i -> insensitive : 덜 민감하다는 뜻
    videos = await Video.find({
      title: {
        $regex: searchingBy,
        $options: "i"
      }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", {
    pageTitle: "Search",
    searchingBy,
    videos
  });
};
// export const videos = (req, res) =>
//  res.render("videos", {pageTitle: "Videos"});

export const getUpload = (req, res) =>
  res.render("upload", {
    pageTitle: "Upload"
  });

export const postUpload = async (req, res) => {
  const {
    body: {
      title,
      description
    },
    file: {
      path
    }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    //request에 user가 있음 / user객체가 request안에 있음 ***
    creator: req.user.id
  });
  // console.log(newVideo.id);
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail

export const videoDetail = async (req, res) => {
  const {
    params: {
      id
    }
  } = req;
  try {
    //populate => 객체를 가져오는 함수
    const video = await Video.findById(id).populate("creator").populate("comments");
    res.render("videoDetail", {
      pageTitle: video.title,
      video
    });
    //해당하는 비디오를 찾지못하면 홈으로 redirect
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
// res.render("videoDetail", {pageTitle: "Video Detail"});

// Edit Video


export const getEditVideo = async (req, res) => {
  const {
    params: {
      id
    }
  } = req;

  try {
    const video = await Video.findById(id);
    if(video.creator !== req.user.id) {
      throw Error();      
    } else {
      res.render("editVideo", {
        pageTitle: `Edit ${video.title}`,
        video
      });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: {
      id
    },
    body: {
      title,
      description
    }
  } = req;
  try {
    //업데이트하기위해서는 body부분에있는 값들을 가져와야해서 findoneandupdeate를 사용
    await Video.findOneAndUpdate({
      _id: id
    }, {
      title,
      description
    });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Delete Video
export const deleteVideo = async (req, res) => {
  const {
    params: {
      id
    }
  } = req;

  try {
    if(video.creator !== req.user.id) {
      throw Error();      
    } else {
      await Video.findOneAndRemove({
        _id: id
      });
    }
  } catch (error) {}
  res.redirect(routes.home);
};

// Register Video View

export const postRegisterView = async(req, res) => { //이 url로 오면 
  const {
    params : { id } //id를 얻고
  } = req;
  try{
    const video = await Video.findById(id); //video를 찾고 찾으면
    video.views += 1; //video count에 1개 증가를 시키고
    video.save(); // 저장하고
    res.satus(200) // ok를 의미
  }catch(error) {
    res.status(400); // 못찾을때를 의미
  } finally {
    res.end(); // 그냥 끝내기
  }
};

// Add Comment

export const postAddComment = async(req, res) => {
  const {
    params : { id }, //id는 url에서 가져오고
    body : {comment }, //comment는 body에서 얻어온다.
    user
  } = req;
  try {
    const video = await Video.findById(id); //video를 찾고 
    const newComment = await Comment.create({ //newComment를 생성하고
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment.id); //comment아이디를 video comment에서 넣어준다
    video.save();
  }catch(error) {
    res.status(400);
  } finally {
    res.ned();
  }
};