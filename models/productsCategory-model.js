const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');//nhận slug

// Khởi tạo plugin slug
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
  parent_id: String,
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

const ProductCategory = mongoose.model('productcategory', productSchema, 'products-category') 
//khi bạn gọi ProductCategory.find(), Mongoose sẽ hiểu rằng bạn đang muốn làm việc với mô hình 'productcategory' (cái khai báo đầu tiên đó hhaha); 
//Thuộc tính đầu tiên (tên mô hình) không bị bỏ qua. Nó được sử dụng để tham chiếu đến mô hình trong mã và không ảnh hưởng đến tên collection trong MongoDB.
//Thuộc tính thứ ba (tên collection) được sử dụng để xác định collection mà mô hình sẽ tương tác.
module.exports = ProductCategory