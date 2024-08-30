const express = require('express')
const multer  = require('multer') //upload ảnh
const route = express.Router()
const upload = multer() //upload = multer({ storage: storage() })-> khi chưa upload ảnh trên cloud
const uploadCloud = require("../../middleware/admin/uploadCloud-middleware.js")
const validate = require('../../validates/admin/product-validate.js')
const controller = require('../../controller/admin/productCategory-controller')

route.get('/', controller.index)

route.get('/create', controller.create)

route.post('/create', upload.single("image"), uploadCloud.upload, validate.createPost, controller.createPost)

route.patch('/change-status/:status/:id', controller.changeStatus)

route.patch('/change-multi', controller.changeMulti)

route.get('/edit/:id', controller.edit)

route.patch('/edit/:id', upload.single("image"), uploadCloud.upload, validate.createPost, controller.editPatch)
module.exports = route