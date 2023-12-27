const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const multer = require("multer");
const Jwt = require("./util/Jwt");

const uploads = require("./route/upload");
const user = require("./route/user");
const login = require("./route/login");
const register = require("./route/register");

//挂载参数处理的中间件
//extended:false 表示使用系统模块querystring来处理 将字符串转化为对象
app.use(
    bodyparser.urlencoded({
        extended: true,
    })
);
app.use(bodyparser.json());
//挂载内置中间件处理静态文件
app.use(express.static("public"));

//上传文件中间件
var filestorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        // cb(null, "[maues]-" + file.originalname);
        cb(null, file.originalname);
    },
    fileFilter(req, file, cb) {
        // 解决中文名乱码的问题
        file.originalname = Buffer.from(req.file.originalname, "latin1").toString(
            "utf8"
        );
    },
});

var upload = multer({
    storage: filestorageEngine,
});

// express框架解决跨域问题的代码，注意该代码要放在 app.use(router); 之前
//设置跨域请求
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Content-Length, Authorization,Token,Accept, X-Requested-With , yourHeaderFeild"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//拦截器
app.use((req, res, next) => {
    const url = req._parsedUrl.pathname; // 获取当前访问的api地址
    console.log(url);
    // 不需要进行验证的api，白名单
    const urlArr = ["/api/login", "/api/register"];
    if (urlArr.indexOf(url) >= 0) {
        next();
        return false;
    }
    let token = req.headers["token"];
    Jwt.getToken(token)
        .then((data) => {
            // 解析正确
            res.data = data;
            req.body.user_id = data.userId
            next();
        })
        .catch((error) => {
            console.log(error);
            res.send({err: 401, msg: "token信息错误,不存在,过期"});
        });
});

app.get("/", function (req, res) {
    res.send("Hello World");
});

//路由分发
app.use("/api", upload.single("file"), uploads);
app.use("/api", user);
app.use("/api", register);
app.use("/api", login);

let server = app.listen(3000, function () {
    let port = server.address().port;
    console.log("应用实例，访问地址为 http://localhost:%s", port);
});
