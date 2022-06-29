const {Router} = require('express')
const UserController = require('./Controller/UserController')
const PostController = require('./Controller/PostController')
const multer = require('multer')
const uploadConfig = require('./config/upload')

const routes = Router()
const upload = multer(uploadConfig)

const userController = new UserController()
const postController = new PostController()

routes.post('/create-user', upload.single('image'), userController.create)
routes.post('/user/login', userController.login)
routes.get('/user/profile/:username', userController.profile)
routes.put('/user/profile/edit/:id', upload.single('image'),userController.editProfile)

// posts

routes.post('/add-post', upload.single('image'), postController.create)
routes.get('/posts', postController.index)


module.exports = routes