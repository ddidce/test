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

//깃허브페이지로 보내는것
export const githubLogin = passport.authenticate("github");


//user가 있나 확인
// cb = passport로부터 우리에게 제공되는것
export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: {
            id,
            avatar_url: avatarUrl,
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
            avatarUrl
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};

//로그인 성공시 redirect해주는 것
export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
};


export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (_, __, profile, cb) => {
    const {
        __json: {
            id,
            name,
            email
        }
    } = profile;
    try {
        const user = await User.findOne({
            email
        });
        if (user) {
            user.facebookId = id;
            user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`
            user.save();
            //cb 첫번쨰 매개변수 null은에러없음, 두번째는 user는 찾았음
            return cb(null, user);;
        }
        const newUser = await User.create({
            email,
            name,
            facebookId: id,
            avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
};

export const getMe = (req, res) => {
    res.render("userDetail", {
        pageTitle: "User Detail",
        user: req.user
    });
};

export const userDetail = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    try {
        const user = await User.findById(id).populate("videos");
        console.log(user);
        res.render("userDetail", {
            pageTitle: "User Detail",
            user
        });
    } catch (error) {
        res.redirect(routes.home);
    }
}
export const getEditProfile = (req, res) =>
    res.render("editProfile", {
        pageTitle: "Edit Profile"
    });

    export const postEditProfile = async (req, res) => {
        const {
          body: { name, email },
          file
        } = req;
        try {
          await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl
          });
          res.redirect(routes.me);
        } catch (error) {
          res.redirect(routes.editProfile);
        }
      };
export const getChangePassword = (req, res) =>
    res.render("changePassword", {
        pageTitle: "Change Password"
    });

export const postChangePassword = async(req, res) => {
    const {
        body: {
            oldPassword,
            newPassword,
            newPassword1
        } 
    }= req;
    try {
        if(newPassword !== newPassword1){
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);

    } catch(error) {
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
    }
};