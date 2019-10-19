import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name : String,
    email: String,
    avatarUrl: String,
    facebookId: Number,
    githubId: Number,
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
        }
      ],
    videos: [
        {
            //objectid에게 ref로 어느 모델에서 온건지 알려줘야함
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video"
        }
      ]
});

UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

const model = mongoose.model("User", UserSchema);

export default model;