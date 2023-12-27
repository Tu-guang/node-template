const express = require('express');
const router = express.Router();
const db = require("../config/db.config");
const User = db.User;
const {signToken} = require("../util/Jwt")
const Op = db.Sequelize.Op;

/**
 * 登录
 */
router.post('/login', async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({
        where: {
            username: username,
            password: password
        }
    });
    if (user != null) {
        const token = signToken(username, user.id);
        res.send({code: 200, msg: "登录成功", data: token})
    } else {
        res.send({code: 200, msg: "账号或密码错误"})
    }

});

module.exports = router;
