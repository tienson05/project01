const ProductCategory = require('../../models/productsCategory-model')
const systemConfig = require('../../config/system')
const infoStatus = require("../../helpers/infostatus")
const searchHelper = require("../../helpers/search");
// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  const infoButtons = infoStatus(req.query);
  let find = {
    deleted: false
  }
  //thêm trạng thái vào find
  if(req.query.status) {
    find.status = req.query.status
  }
  // Tính năng tìm kiếm
  const search = searchHelper(req.query)
  if(search.regex) {
    find.name = search.regex
  }
  // Sắp xếp
  let sort = {}
  if(req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue
  } else {
    sort.position = "desc"
  }

  function createTree(arr, parentId = "") {
    const tree = []
    arr.forEach(item => {
      if(item.parent_id == parentId) {
        const newItem = item
        const children = createTree(arr, item.id)
        if(children.length > 0) {
          newItem.children = children
        }
        tree.push(newItem)
      }
    });
    return tree
  }

  const records = await ProductCategory.find(find).sort(sort)

  const newCategory = createTree(records)
  res.render("admin/pages/products-category/index", {
    pageTitle: 'Danh mục sản phẩm',
    records: newCategory,
    infoButtons: infoButtons
  })
}
// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  }
  function createTree(arr, parentId = "") {
    const tree = []
    arr.forEach(item => {
      if(item.parent_id == parentId) {
        const newItem = item
        const children = createTree(arr, item.id)
        if(children.length > 0) {
          newItem.children = children
        }
        tree.push(newItem)
      }
    });
    return tree
  }
  const category = await ProductCategory.find(find)

  const newCategory = createTree(category)

  res.render("admin/pages/products-category/create", {
    pageTitle: 'Tạo danh mục',
    category: newCategory
  })
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if(req.body.position == "") {
    const countProducts = await ProductCategory.countDocuments()
    req.body.position = countProducts + 1
  } else {
    req.body.position = parseInt(req.body.position)
  } 
  const product = new ProductCategory(req.body)
  await product.save()
  res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}

// [PATCH] /admin/products-category/changeStatus/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status
  const id = req.params.id
  await ProductCategory.updateOne({_id: id}, {status: status})
  req.flash('success', 'Cập nhật thành công trạng thái!!!');
  res.redirect('back')
}

// [PATCH] /admin/products-category/changeMulti
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type
  const ids =  req.body.ids.split(",")
  let i=0
  switch(type) {
    case "active":
      await ProductCategory.updateMany({ _id: {$in: ids}}, {
        status: "active",
      })
      req.flash('success', `Cập nhật thành công trạng thái ${ids.length} sản phẩm!!!`);
      break
    case "unactive":
      await ProductCategory.updateMany({ _id: {$in: ids}}, {status: "unactive"})
      req.flash('success', `Cập nhật thành công trạng thái ${ids.length} sản phẩm!!!`);
      break
    case "delete-all":
      await ProductCategory.updateMany({ _id: {$in: ids}}, {
        deleted: true,
        deleteAt: new Date()
      })
      req.flash('success', `Xóa thành công ${ids.length} sản phẩm!!!`);
      break
    case "change-position":
      for (const item of ids) {
        const [id, position] = item.split("-")
        await ProductCategory.updateOne({_id: id}, {position: position})
      }
      req.flash('success', `Thay đổi vị trí thành công ${ids.length} sản phẩm!!!`);
      break
    default:
      break
  }
  res.redirect("back")
}

