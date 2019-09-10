import express from "express";
const app = express(); //application을 만듬
// () => { } 함수

const PORT = 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hello from ass");

const handleProfile = (req, res) => res.send("You are on my profile"); //babel 의 함수사용방법  =>  <- arrow function

app.get("/", handleHome);
app.get("/profile" , handleProfile);

app.listen(PORT , handleListening);