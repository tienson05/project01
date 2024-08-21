const Product = require('../../models/product-model.js')

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort({position: "desc"});
  products.forEach((item) => {
    item.priceCents /= 100;
  });
  res.render("client/pages/products/index.pug", {
    pageTitle: 'Trang sản phẩm',
    products: products
  })
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slug
    let find = {
      deleted: false,
      slug: slug,
      status: "active"
    }
  
    const product = await Product.findOne(find)
    res.render("client/pages/products/detail", {
      pageTitle: 'Chi tiết sản phẩm',
      product: product
    })
  } catch (error) {
    res.redirect('/products')
  }
}
