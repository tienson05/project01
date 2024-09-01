const dashboardRoutes = require("./dashboard-route") 
const productRoutes = require('./products-route.js')
const productCategotyRoutes = require("./products-category-route.js")
const rolesRoutes = require('./roles-route.js')
const systemConfig = require("../../config/system")
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin

  app.use(PATH_ADMIN + '/dashboard', dashboardRoutes)

  app.use(PATH_ADMIN + '/products', productRoutes)

  app.use(PATH_ADMIN + '/products-category', productCategotyRoutes)

  app.use(PATH_ADMIN + '/roles', rolesRoutes)
}