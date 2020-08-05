import express from 'express'
import md5 from 'blueimp-md5'
import formidable from 'formidable'
import mongoose from 'mongoose'
import config from '../src/config.js'
import path from 'path'
import {
	User
} from '../db/db'
import {
	sendMail,
	randomNum
} from '../util/util'
const router = express.Router();

const S_KEY = 'leavehao@foxmail.com' //盐

//验证邮箱
router.get('/sendmail', (req, res) => {
	let userEmail = req.query.userEmail;
	let confirmMes = randomNum();
	req.session.userEmail = req.query.userEmail;
	req.session.confirmMes = confirmMes;
	console.log(confirmMes)
	sendMail(userEmail, '网上服装商城系统', `Hi,您的注册验证码是:${confirmMes}`);
	res.json({
		status_code: 200,
		message: '验证码已发送'
	})
})

export default router;
