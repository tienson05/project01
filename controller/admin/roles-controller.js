const Role = require('../../models/roles-model')
const systemConfig = require('../../config/system')
// [GET] admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await Role.find(find)
  res.render('admin/pages/roles/index', {
    pageTitle: "Nhóm quyền",
    records: records
  })
}

// [GET] admin/roles/create
module.exports.create = async (req, res) => {
  res.render('admin/pages/roles/create', {
    pageTitle: "Tạo nhóm quyền"
  })
}

// [POST] admin/roles/create
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body)
  await record.save()

  res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] admin/roles/detail/:id
module.exports.detail = async (req, res) => {
  let find = {
    _id: req.params.id,
    deleted: false
  }
  const data = await Role.findOne(find)
  
  res.render('admin/pages/roles/detail', {
    pageTitle: "Chi tiết nhóm quyền",
    data: data
  })
}

// [GET] admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  let find = {
    _id: req.params.id,
    deleted: false
  }
  const data = await Role.findOne(find)
  res.render('admin/pages/roles/edit', {
    pageTitle: "Sửa nhóm quyền",
    data: data
  })
}

// [PATCH] admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    await Role.updateOne({_id: req.params.id}, req.body)
    req.flash('success', `Cập nhật thành công!!!`);
  } catch (error) {
    req.flash('error', `Cập nhật ko thành công!!!`);
  }
  res.redirect('back')
}

// [DELETE] admin/roles/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id
  await Role.updateOne({_id: id}, {
    deleted: true,
    deleteAt: new Date()
  })
  res.redirect("back")
}

// [GET] admin/roles/deleted
module.exports.Deleted = async (req, res) => {
  let find = {
    deleted: true
  }
  const records = await Role.find(find)
  res.render("admin/pages/roles/deleted", {
    pageTitle: "Nhóm quyền đã xóa",
    records: records
  })
}

// [GET] admin/roles/undo
module.exports.undo = async (req, res) => {
  try {
    await Role.updateOne({_id: req.params.id}, {
      deleted: false
    })
    req.flash("success", "Hoàn tác thành công")
  } catch (error) {
    req.flash("error", "Hoàn tác ko thành công")
  }
  
  res.redirect("back")
}

