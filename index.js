import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();

const PORT = 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hello from ass");

const handleProfile = (req, res) => res.send("You are on my profile"); //babel 의 함수사용방법  =>  <- arrow function


app.use(cookieParser());
app.use(bodyParser.json({extends : true}));
app.use(bodyParser.urlencoded({extends : true}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);

app.get("/profile" , handleProfile);

app.listen(PORT , handleListening);