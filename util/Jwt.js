const jwt = require("jsonwebtoken");
// 秘钥
const jwtSecret = "123456";
// 加密 参数是要存入到token中的信息
exports.signToken = (userName, userId) => {
    return jwt.sign({userName, userId}, jwtSecret, {expiresIn: "1d"});
};
exports.getToken = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject({error: "token是空的"});
        } else {
            const info = jwt.verify(token, jwtSecret);
            resolve(info); //解析返回的值
        }
    });
};
