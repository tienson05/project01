const Product = require('../../models/product-model')
const infoStatus = require("../../helpers/infostatus")
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination")
const systemConfig = require('../../config/system')
//const storage = require("../../helpers/storageMulter.js");

// [GET] /admin/products
module.exports.productsAdmin = async (req, res) => {
  const infoButtons = infoStatus(req.query);
  let find = {
    deleted: false
  }
  if(req.query.status) {
    find.status = req.query.status;
  } 
// Tính năng tìm kiếm
  const search = searchHelper(req.query)
  if(search.regex) {
    find.name = search.regex
  }
//Pagination
  const countProducts = await Product.countDocuments(find)
  let objectPagination = paginationHelper({
    currentPage: 1,
    limitItems: 4
  }, req.query, countProducts)
// Sắp xếp
  let sort = {}
  if(req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue
  } else {
    sort.position = "desc"
  }
  
  const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skipItems)

  products.forEach((item) => {
    item.priceCents /= 100;
  })

  res.render("admin/pages/products/index", {
    pageTitle: 'Trang sản phẩm',
    products: products,
    infoButtons: infoButtons,
    keyword: search.keyword,
    pagination: objectPagination
  })
}

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status
  const id = req.params.id
  await Product.updateOne({_id: id}, {status: status})
  req.flash('success', 'Cập nhật thành công trạng thái!!!');
  res.redirect('back')
}

//[PATCH] /admin/products//change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type
  const ids =  req.body.ids.split(",")
  let i=0
  switch(type) {
    case "active":
      await Product.updateMany({ _id: {$in: ids}}, {
        status: "active",
      })
      req.flash('success', `Cập nhật thành công trạng thái ${ids.length} sản phẩm!!!`);
      break
    case "unactive":
      await Product.updateMany({ _id: {$in: ids}}, {status: "unactive"})
      req.flash('success', `Cập nhật thành công trạng thái ${ids.length} sản phẩm!!!`);
      break
    case "delete-all":
      await Product.updateMany({ _id: {$in: ids}}, {
        deleted: true,
        deleteAt: new Date()
      })
      req.flash('success', `Xóa thành công ${ids.length} sản phẩm!!!`);
      break
    case "change-position":
      for (const item of ids) {
        const [id, position] = item.split("-")
        await Product.updateOne({_id: id}, {position: position})
      }
      req.flash('success', `Thay đổi vị trí thành công ${ids.length} sản phẩm!!!`);
      break
    default:
      break
  }
  res.redirect("back")
}

//[DELETE] /admin/products//delete/:id
module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id
  await Product.updateOne({_id: id}, {
    deleted: true,
    deleteAt: new Date()
  })
  res.redirect("back")
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {

  res.render("admin/pages/products/create", {
    pageTitle: 'Thêm mới sản phẩm',
  })
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.priceCents = parseInt(req.body.priceCents)
  if(req.body.position == "") {
    const countProducts = await Product.countDocuments()
    req.body.position = countProducts + 1
  } else {
    req.body.position = parseInt(req.body.position)
  } 

  // if(req.file) {
  //   req.body.image = `/uploads/${req.file.filename}` // khi chưa tạo cloud để lưu ảnh
  // }
  
  const product = new Product(req.body)
  await product.save()
  res.redirect(`${systemConfig.prefixAdmin}/products`)
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id
  let find = {
    deleted: false,
    _id: id
  }
  try {
    const product = await Product.findOne(find)
    res.render("admin/pages/products/edit", {
      pageTitle: 'Chỉnh sửa sản phẩm',
      product: product
    })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  req.body.priceCents = parseInt(req.body.priceCents)
  req.body.position = parseInt(req.body.position)
  if(req.file) {
    req.body.image = `/uploads/${req.file.filename}`
  }

  try {
    await Product.updateOne({_id: req.params.id}, req.body)
    req.flash('success', `Cập nhật thành công!!!`);
  } catch (error) {
    req.flash('error', `Cập nhật thất bại!!!`);
  }
  res.redirect("back")
}

//[GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id
    let find = {
      deleted: false,
      _id: id
    }
  
    const product = await Product.findOne(find)
    res.render("admin/pages/products/detail", {
      pageTitle: 'Chi tiết sản phẩm',
      product: product
    })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
}