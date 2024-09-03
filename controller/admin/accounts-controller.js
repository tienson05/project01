const md5 = require('md5');
const Account = require('../../models/account-model')
const Role = require('../../models/roles-model')
const systemConfig = require('../../config/system')
//[GET] /admin/accounts
module.exports.index = async (req, res) => {
  const records = await Account.find({deleted: false}).select("-password -token")
  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false
    })
    record.role = role
  }
  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records
  })
}

//[PATCH] /admin/accounts/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status
  const id = req.params.id
  await Account.updateOne({_id: id}, {status: status})
  req.flash('success', 'Cập nhật thành công trạng thái!!!');
  res.redirect('back')
}

//[GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const records = await Role.find({deleted: false})

  res.render("admin/pages/accounts/create", {
    pageTitle: "Thêm mới tài khoản",
    records: records
  })
}

//[POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  req.body.password = md5(req.body.password)
  const emailExits = await Account.findOne({
    email: req.body.email,
    deleted: false
  })
  if(emailExits) {
    req.flash("error", "Email này đã tồn tại!")
    res.redirect("back")
  } else {
    const data = new Account(req.body)
    await data.save()
    req.flash("success", "Tạo tài khoản thành công!")
    res.redirect(`${systemConfig.prefixAdmin}/accounts`)
  }
}

//[GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  const records = await Role.find({deleted: false})
  const record = await Account.findOne({
    _id: req.params.id,
  }).select("-password -token")
  res.render("admin/pages/accounts/edit", {
    pageTitle: "Chỉnh sửa tài khoản",
    records: records,
    record: record
  })
}

//[PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const emailExits = await Account.findOne({
      _id: { $ne: req.params.id},
      email: req.body.email,
      deleted: false
    })
    if (emailExits) {
      req.flash("error", "Email này đã tồn tại!")
      res.redirect("back")
    } else {
      if(req.body.password) {
        req.body.password = md5(req.body.password)
      } else {
        delete req.body.password
      }
      await Account.updateOne({_id: req.params.id}, req.body)
      req.flash("success", "Cập nhật thành công!")
      res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!")
  }
}

//[DELETE] /admin/accounts/delete/:id
module.exports.delete = async (req, res) => {
  await Account.updateOne({_id: req.params.id}, {
    deleted: true,
    deleteAt: new Date()
  })
  req.flash("success", "Đã xóa thành công!")
  
  res.redirect("back")
}

//[GET] /admin/accounts/deleted
module.exports.Deleted = async (req, res) => {
  const records = await Account.find({deleted: true}).select("-password -token")
  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false
    })
    record.role = role
  }
  res.render("admin/pages/accounts/deleted", {
    pageTitle: "Tài khoản đã xóa",
    records: records
  })
}
//[GET] /admin/accounts/undo
module.exports.undo = async (req, res) => {
  await Account.updateOne({_id: req.params.id},{
    deleted: false
  })
  req.flash("success", "Hoàn tác thành công!")
  res.redirect("back")
}






