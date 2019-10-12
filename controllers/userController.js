import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", {
        pageTitle: "Join"
    });
};
export const postJoin = async (req, res, next) => {
    const {
        body: {
            name,
            email,
            password,
            password2
        }
    } = req;
    if (password !== password2) {
        res.status(400);
        res.render("join", {
            pageTitle: "Join"
        });
    } else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
        //To Do : Log user in(사용자 로그인)
    }
};


export const getLogin = (req, res) =>
    res.render("login", {
        pageTitle: "Login"
    });

//passport.authenticate()는 username과 password를 찾게되어있음
//즉 유저컨트롤러에서 body부분에 있는것처럼 그리고 글로벌 라우터에서
//이부분에서 미들웨어인 postjoin이 이메일 패스워드 등 정보를 받아서
//사용자를 가입시키고 22번째줄 next가 호출되어 다음으로 넘어가서
// 같은 정보를 전달하게 되는데 다시 글로벌라우터로가서 postlogin은
//사용자를 로그인시켜주는 것
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

// cb = passport로부터 우리에게 제공되는것
export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: {
            id,
            avatar_url,
            name,
            email
        }
    } = profile;
    try {
        const user = await User.findOne({
            email
        });
        if (user) {
            user.githubId = id;
            user.save();
            //cb 첫번쨰 매개변수 null은에러없음, 두번째는 user는 찾았음
            return cb(null, user);;
        }
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl: avatar_url
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};

export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
};

export const userDetail = (req, res) =>
    res.render("userDetail", {
        pageTitle: "User Detail"
    });
export const editProfile = (req, res) =>
    res.render("editProfile", {
        pageTitle: "Edit Profile"
    });
export const changePassword = (req, res) =>
    res.render("changePassword", {
        pageTitle: "Change Password"
    });