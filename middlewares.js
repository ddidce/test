import routes from "./routes";

export const localsMiddelware = (req, res, next) => {
    res.locals.siteName = "Youtube";
    res.locals.routes = routes
    next();
}