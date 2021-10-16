const router = require("express").Router();
const {
  models: { Product, Brand },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const brands = await Brand.findAll({
      include: [Product],
    });
    res.json(brands);
  } catch (err) {
    next(err);
  }
});

// Retrieving data for specific product...
router.get("/:id", async (req, res, next) => {
  try {
    const singleBrand = await Brand.findByPk(req.params.id, {
      include: [Product],
    });
    res.json(singleBrand);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
