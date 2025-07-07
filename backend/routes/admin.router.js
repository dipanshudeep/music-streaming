import express from 'express'
import { login, register, uploadMusic } from '../controllers/admin.controller.js'
import upload from '../middlewares/mullter.js'

const adminRouter = express.Router()

adminRouter.post('/register',register)
adminRouter.post('/login',login)
adminRouter.post('/add-music',upload.fields([{name:'music',maxCount:1},{name:'image',maxCount:1}]),uploadMusic)


export default adminRouter