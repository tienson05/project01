const Account = require('../../models/account-model')
const Role = require('../../models/roles-model')
const systemConfig = require('../../config/system')

module.exports.requireAuth = async (req, res, next) => {
  if(!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
  } else {
    const user = await Account.findOne({ token: req.cookies.token}).select("-password")
    if(user) {
      const role = await Role.findOne({_id: user.role_id}).select("title permissions")
      res.locals.user = user//sử dụng được trên tất cả các file
      res.locals.role = role//sử dụng được trên tất cả các file
      next()
    } else {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }
  }
}