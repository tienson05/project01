const express = require('express')
const multer  = require('multer') //upload ảnh
const route = express.Router()
// const storage = require("../../helpers/storageMulter.js"); //không dùng cái này nữa vì upload ảnh trên cloud rồi

const upload = multer() //upload = multer({ storage: storage() })-> khi chưa upload ảnh trên cloud

const uploadCloud = require("../../middleware/admin/uploadCloud-middleware.js")

const controller = require('../../controller/admin/products-controller')
const validate = require('../../validates/admin/product-validate.js')

route.get('/', controller.productsAdmin);

route.patch('/change-status/:status/:id', controller.changeStatus)

route.patch('/change-multi', controller.changeMulti)

route.delete('/delete/:id', controller.deleteProduct)

route.get('/create', controller.create);

route.post('/create', upload.single("image"), uploadCloud.upload, validate.createPost, controller.createPost);

route.get('/edit/:id', controller.edit);

route.patch('/edit/:id', upload.single("image"), validate.createPost, controller.editPatch);

route.get('/detail/:id', controller.detail);

module.exports = route