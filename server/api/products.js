const router = require("express").Router();
const {
  models: { Product, Brand, OrderItem },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Brand,
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// ATTENTION (Riv): It might be better for the following post/put/delete requests to migrate to api/admin.js

//Creating New Product...
router.post("/", async (req, res, next) => {
  try {
    res.send(await Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

//Updating Single Product...
router.put("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);
    await singleProduct.update(req.body);
    res.send(singleProduct);
  } catch (err) {
    next(err);
  }
});

//Deleting Single Product...
router.delete("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);
    await singleProduct.destroy();
    res.send(singleProduct);
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
