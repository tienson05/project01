const express = require('express')
const route = express.Router()
const controller = require('../../controller/admin/roles-controller')

route.get('/', controller.index);

route.get('/create', controller.create);

route.post('/create', controller.createPost);

route.get('/detail/:id', controller.detail);

route.get('/edit/:id', controller.edit);

route.patch('/edit/:id', controller.editPatch);

route.delete('/delete/:id', controller.delete);

route.get('/deleted', controller.Deleted);

route.get('/undo/:id', controller.undo);
module.exports = route