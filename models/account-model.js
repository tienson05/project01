const mongoose = require('mongoose')
const generate = require('../helpers/generate')
const accountSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
  token: {
    type: String,
    default: generate.generateRandomString(20)
  },
  avatar: String,
  role_id: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date 
}, {
  timestamps: true //tự động thêm time tạo sản phẩm và time update
}); 

const Account = mongoose.model('account', accountSchema, 'accounts')

module.exports = Account