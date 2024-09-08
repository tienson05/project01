const md5 = require('md5');
const Account = require('../../models/account-model')
const systemConfig = require('../../config/system')

// [GET] admin/auth/login
module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login", {
    pageTitle: "Đăng nhập"
  })
}

// [POST] admin/auth/login
module.exports.loginPost = async (req, res) => {
  const user = await Account.findOne({
    email: req.body.email,
    deleted: false
  })
  if(!user) {
    req.flash("error", "Email này không tồn tại!")
    res.redirect("back")
    return;
  }
  if(md5(req.body.password) != user.password) {
    req.flash("error", "Mật khẩu không đúng!")
    res.redirect("back")
    return;
  }
  if(user.status == "unactive") {
    req.flash("error", "Tài khoản đã bị khóa!")
    res.redirect("back")
    return;
  }
  res.cookie("token", user.token)
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}

module.exports.logout = async (req, res) => {

  res.clearCookie('token')
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}
