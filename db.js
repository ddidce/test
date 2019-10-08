import mongoose from 'mongoose';
import dotenv from "dotenv";
//.env 파일 안에 있는 정보를 불러올수있음
dotenv.config();

mongoose.connect( 
//monogose는 이런식으로 configuration을 보낼수 있음
process.env.MONGO_URL,
{
    useNewUrlParser:true, 
    useFindAndModify:false,
    useUnifiedTopology: true
});

const db = mongoose.connection;

//성공여부를 알려주는 함수
const handleOpen = () => console.log("✅  Connected to DB");
const handleError = error => console.log(`❌ DB와 연결되지 않았음: ${error}`);

db.once("open",handleOpen );
db.on("error", handleError);