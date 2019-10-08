import passport from "passport";
import User from "./models/User";


//strategy = 로그인하는 방식
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());