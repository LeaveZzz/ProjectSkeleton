import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import md5 from 'blueimp-md5'
import formidable from 'formidable'
import config from '../src/config.js'
import {
	Administrator,
	Goods
} from '../db/db'
const router = express.Router();

const S_KEY = 'leavehao@foxmail.com' //盐

//管理员登录
router.post('/login', async (req, res) => {
	let adminName = req.body.adminName;
	let adminPsw = md5(md5(req.body.adminPsw) + S_KEY);
	let result = await Administrator.findOne({
		adminName
	})
	if (result) {
		if (adminPsw === result.password) {
			req.session.admin = adminName;
			res.json({
				status_code: 200,
				message: '登录成功',
			})
		} else {
			res.json({
				status_code: 400,
				message: '密码错误'
			})
		}
	} else {
		res.json({
			status_code: 400,
			message: '用户名不存在'
		})
	}
})

//设置后台访问权限
router.use((req, res, next) => {
	if (!req.session.admin) {
		res.json({
			status_code: 400,
			message: '无权访问'
		})
	}
	next();
})

// 验证登录状态,若未被中间件拦截则为登录状态
router.get('/isadmin', async (req, res) => {
	let result = await Administrator.findOne({
		adminName: req.session.admin
	})
	res.json({
		status_code: 200,
		message: '进入管理员界面',
		adminName: req.session.admin,
		role: result.role
	})
})

//退出登录
router.get('/logout', (req, res) => {
	req.session.admin = '';
	res.json({
		status_code: 200,
		message: '已退出登录'
	})
})

//添加商品
router.post('/addgoods', (req, res) => {
	const form = new formidable.IncomingForm();
	form.uploadDir = config.uploadsGoodsPath; // 上传图片放置的文件夹
	form.keepExtensions = true; // 保持文件的原始扩展名
	form.parse(req, (err, fields, files) => {
		let goodsInfo = {
			goodsId: fields.goodsId,
			shortName: fields.shortName,
			goodsName: fields.goodsName,
			goodsPrice: fields.goodsPrice,
			normalPrice: fields.normalPrice,
			salesTips: fields.salesTips,
			goodsCategory: fields.goodsCategory,
			goodsCounts: Number(fields.goodsCounts),
			goodsImg: 'http://localhost:' + config.port + '/uploads/' + path.basename(files.goodsImg.path),
			goodsComments: 0
		}
		Goods.create(goodsInfo, async (err, doc) => {
			//更新商品分类里的商品数量
			let result = await Goods.find({
				goodsCategory: fields.goodsCategory
			});
			Category.updateOne({
				cateId: fields.goodsCategory
			}, {
				cateCounts: result.length
			}).then(doc => console.log('doc', doc)).catch(err => console.log('err', err))

			if (!err) {
				res.json({
					status_code: 200,
					message: '添加商品成功',
				})
			} else {
				res.json({
					status_code: 400,
					message: '内部错误,添加商品失败',
				})
			}
		})
	})
})

export default router;
