const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
// __dirname = 현재 프로젝트 디렉토리 이름 / node.js 전역 변수 entry파일 경로 그냥 쭉 쓰면됌
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ["@babel/polyfill", ENTRY_FILE],
    mode: MODE,
    module: {
      rules: [
        {
          test: /\.(js)$/,
          use: [
            {
              loader:"babel-loader"
            }
          ]
        },
        {
          test: /\.(scss)$/,
          use: ExtractCSS.extract([
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                plugins() {
                  return [autoprefixer({Browserslist: "cover 99.5%" })];
                }
              }
            },
            {
              loader: "sass-loader"
            }
          ])
        }
      ]
    },
    output: {
      path: OUTPUT_DIR,
      filename: "[name].js"
    },
    plugins: [new ExtractCSS("styles.css")]
  };
  
module.exports = config;