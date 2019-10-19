import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import { githubLoginCallback, facebookLoginCallback } from "./controllers/userController";
import routes from "./routes";


//strategy = 로그인하는 방식
passport.use(User.createStrategy());

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GH_ID,
            clientSecret: process.env.GH_SECRET,
            callbackURL: `http://localhost:4000${routes.githubCallback}`
        },
        githubLoginCallback
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FB_ID,
            clientSecret: process.env.FB_SECRET,
            callbackURL: `https://massive-vampirebat-31.localtunnel.me${
                routes.facebookCallback
            }`,
            profileFields: ["id", "displayName","email"],
            scope: ["public_profile", "email"]
        },
        facebookLoginCallback
    )
);


//다시 공부해보자
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());