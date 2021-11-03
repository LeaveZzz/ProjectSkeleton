import express from 'express'
import userRouter from './user'
import adminRouter from './admin'
require('../db/db')
const router = express.Router();

router.get('/',(req,res)=>{
	res.send('<h1>HELLO WORLD!</h1>')
})

router.use('/user',userRouter)

router.use('/admin',adminRouter)

export default router;
