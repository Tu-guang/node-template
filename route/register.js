const express = require('express');
const router = express.Router();
const db = require("../config/db.config");
const User = db.User;
const Op = db.Sequelize.Op;

/**
 * 注册
 */
router.post('/register', async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({
        where: {
            username: username,
            password: password
        }
    });
    if(user!=null){
        res.send({code: 500, msg: "该账号已经被注册过了"})
        return
    }
    await User.create({username:username,password:password});
    res.send({code: 200, msg: "注册成功"})
});

module.exports = router;
