import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import {localsMiddelware} from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./passport";

const app = express();

const CokieStore = MongoStore(session);

app.use(helmet()); //helmet은 application을 더 안전하도록 도와줌
app.set('view engine', "pug"); //view engine은 처음에 default라서 pug엔진으로 바꿔줌
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser()); //cookieParser은 쿠키를 전달받아서 사용할 수 있도록 하는 미들웨어
app.use(bodyParser.json()); //bodyParser은 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); //morgan은 application에서 발생하는 일들을 loging하는 것
app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: true,
      saveUninitialized: false,
      store: new CokieStore({mongooseConnection: mongoose.connection})
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  

app.use(localsMiddelware);



app.use(routes.home, globalRouter); //이안에 홈, 서치, 조인, 로그인, 로그아웃URL이 담겨있음
app.use(routes.users, userRouter); //use의 의미는 누군가 /user경로에 접속하면 이 router전체를 사용하겠다는 의미 , user URL이 담겨있음 주소는 routes에 정의
app.use(routes.videos, videoRouter);

export default app; //누군가 import할때  app object를 주겠단 의미