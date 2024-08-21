const express = require('express')
const route = require("./routes/client/index-route")
const routeAdmin = require("./routes/admin/index-route")
const database = require('./config/database.js')

const systemConfig = require("./config/system.js")

require('dotenv').config()
const methodOverride = require('method-override')//lấy gói có thể lấy các phương thức trong pug
const bodyParser = require('body-parser')//lấy các data trong req.body
const flash = require('express-flash')//package cho hiển thị thông báo như lỗi hoặc thành công
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const port = process.env.PORT

database.connect()

app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', `${__dirname}/views`);//thêm dirname để chạy được trên online, chứ để ./views nó sẽ ko hiểu
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`)); //dùng file tĩnh như trong folder public, thêm dirname để chạy online

// App local varibles
app.locals.prefixAdmin = systemConfig.prefixAdmin
//Flash
app.use(cookieParser('fakdhfkdjfkjaa'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//End Flash
// Route
route(app)
routeAdmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})