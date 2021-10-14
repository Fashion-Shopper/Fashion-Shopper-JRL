const router = require("express").Router();
const {
  models: { Product, Brand },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Brand],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Retrieving data for specific product...
router.get("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(
      // Note (Riv): should it be just id or productId?
      req.params.id,
      {
        include: [Brand],
      }
    );
    res.json(singleProduct);
  } catch (err) {
    next(err);
  }
});
