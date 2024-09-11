const dashboardRoutes = require("./dashboard-route") 
const productRoutes = require('./products-route.js')
const productCategotyRoutes = require("./products-category-route.js")
const rolesRoutes = require('./roles-route.js')
const accountsRoutes = require('./accounts-route.js')
const authRoutes = require('./auth-route.js')
const authMiddleware = require('../../middleware/admin/auth-middleware.js')

const systemConfig = require("../../config/system")
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin

  app.use(PATH_ADMIN + '/dashboard', authMiddleware.requireAuth, dashboardRoutes)

  app.use(PATH_ADMIN + '/products', authMiddleware.requireAuth, productRoutes)

  app.use(PATH_ADMIN + '/products-category', authMiddleware.requireAuth, productCategotyRoutes)

  app.use(PATH_ADMIN + '/roles', authMiddleware.requireAuth, rolesRoutes)

  app.use(PATH_ADMIN + '/accounts', authMiddleware.requireAuth, accountsRoutes)

  app.use(PATH_ADMIN + '/auth', authRoutes)

}