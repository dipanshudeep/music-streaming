import express from 'express'
import { register } from '../controllers/admin.controller.js'


const adminRouter = express.Router()

adminRouter.post('/register',register)

export default adminRouter