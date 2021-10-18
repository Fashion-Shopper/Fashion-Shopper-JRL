const router = require("express").Router();
const { models: { Product, Brand, OrderItem } } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Brand
      }
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Retrieving data for specific product...
// router.get("/:id", async (req, res, next) => {
//   try {
//     const productId = req.params.id
//     const singleProduct = await Product.findByPk(productId, {
//       include: Brand
//     });
//     res.json(singleProduct);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;