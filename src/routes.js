const {Router} = require('express')
const UserController = require('./Controller/UserController')
const multer = require('multer')
const uploadConfig = require('./config/upload')

const routes = Router()
const upload = multer(uploadConfig)
const userController = new UserController()

routes.post('/create-user', upload.single('image'), userController.create)


module.exports = routes