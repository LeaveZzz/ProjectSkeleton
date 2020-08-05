import mongoose from 'mongoose'
import config from '../src/config'

const password = config.password ? ':' + config.password + '@' : '';
const dbURL = `mongodb://${config.user}${password}${config.host}/${config.database}`;
mongoose.connect(dbURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log(`${config.database}数据库连接成功!`))
	.catch(err => console.log(err, '数据库连接失败!'));

//设置管理员账号规则
const adminSchema = new mongoose.Schema({
	adminName: String,
	password: String,
	role: String
})
export const Administrator = mongoose.model('Administrator', adminSchema)


// Administrator.create({
// 	adminName:'leaveHao',
// 	password:'a467faacecebb65bfff36d26b4d3a469',
// 	role:'超级管理员'
// },(err,doc)=>{
// 	console.log(err,doc)
// })