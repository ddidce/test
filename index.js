const express = require('express'); //node모듈을 어디선가 가져옴 (내 파일내에 있는 express를 가져옴 없으면 node_modules안에서 찾으려고함)
const app = express(); //application을 만듬
// () => { } 함수

const PORT = 4000;

function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`);
}

function handleHome(req, res) {
    res.send('Hello from Home');
}

function handleProfile(req, res) {
    res.send("You are on my profile");
}

app.get("/", handleHome);
app.get("/profile" , handleProfile);

app.listen(PORT , handleListening);