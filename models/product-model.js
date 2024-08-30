const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');//nhận slug

// Khởi tạo plugin slug
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  image: String,
  name: String,
  priceCents: Number,
  deleted: {
    type: Boolean,
    default: false
  },
  slug: { 
    type: String, 
    slug: "name", //lấy tên sản phẩm làm slug
    unique: true //để slug duy nhất cho mỗi sản phẩm
  },
  position: Number,
  status: String,
  deleteAt: Date 
}, {
  timestamps: true //tự động thêm time tạo sản phẩm và time update
}); 

const Product = mongoose.model('product', productSchema, 'products')

module.exports = Product