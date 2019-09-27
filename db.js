import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/youtube" , 
//monogose는 이런식으로 configuration을 보낼수 있음
{
    useNewUrlParser:true, 
    useFindAndModify:false
});

const db = mongoose.connection;

//성공여부를 알려주는 함수
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = error => console.log(`❌ DB와 연결되지 않았음: ${error}`);

db.once("open",handleOpen );
db.on("error", handleError);