const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");

function handleplayClick() {
    if(videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
}

function  init() {
    playBtn.addEventListener("click", handleplayClick)
}

if(videoContainer) {
    init();
}