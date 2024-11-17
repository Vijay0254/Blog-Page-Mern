const express = require('express')
const router = express.Router()
const { postController, getPostController, getPostByIdController, editPostController, deletePostController } = require('../controller/postController')
const { verifyUser } = require('../controller/authController')
const upload = require('../utils/post')

router.post('/create', verifyUser, upload.single('file'), postController)
router.get('/getpost', getPostController)
router.get('/getpost/:id', getPostByIdController)
router.put('/editpost/:id', editPostController)
router.delete('/deletepost/:id', deletePostController)

module.exports = router