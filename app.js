import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";
const app = express();

const handleHome = (req, res) => res.send("Hello from ass");

const handleProfile = (req, res) => res.send("You are on my profile"); //babel 의 함수사용방법  =>  <- arrow function


app.use(cookieParser());
app.use(bodyParser.json({extends : true}));
app.use(bodyParser.urlencoded({extends : true}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);

app.get("/profile" , handleProfile);

app.use("/user", userRouter); //use의 의미는 누군가 /user경로에 접속하면 이 router전체를 사용하겠다는 의미

export default app; //누군가 import할때  app object를 주겠단 의미
