const express = require('express')
const multer  = require('multer') //upload ảnh
const route = express.Router()
const controller = require('../../controller/admin/accounts-controller')
const upload = multer()
const uploadCloud = require("../../middleware/admin/uploadCloud-middleware.js")
const validate = require('../../validates/admin/accounts-validate.js')
route.get('/', controller.index);

route.get('/create', controller.create);

route.post('/create',upload.single("avatar"), uploadCloud.upload, validate.createPost, controller.createPost)

route.get('/edit/:id', controller.edit);

route.patch('/edit/:id',upload.single("avatar"), uploadCloud.upload, validate.editPatch, controller.editPatch)

route.delete('/delete/:id', controller.delete);

route.get('/deleted', controller.Deleted);

route.get('/undo/:id', controller.undo);

route.patch('/change-status/:status/:id', controller.changeStatus);

module.exports = route