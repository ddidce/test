import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
const app = express();



app.use(cookieParser());
app.use(bodyParser.json({extends : true}));
app.use(bodyParser.urlencoded({extends : true}));
app.use(helmet());
app.use(morgan("dev"));


app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); //use의 의미는 누군가 /user경로에 접속하면 이 router전체를 사용하겠다는 의미
app.use(routes.videos, videoRouter);


export default app; //누군가 import할때  app object를 주겠단 의미
