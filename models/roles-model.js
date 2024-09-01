const mongoose = require('mongoose')

const rolesSchema = new mongoose.Schema({
  title: String,
  description: String,
  permissions: {
    type: Array,
    default: []
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date 
}, {
  timestamps: true //tự động thêm time tạo sản phẩm và time update
}); 

const Roles = mongoose.model('role', rolesSchema, 'roles')

module.exports = Roles