const router = require("express").Router();
const usersRoute = require("./users");
const productsRoute = require("./products");
const brandsRoute = require("./brands");
module.exports = router;

router.use("/users", usersRoute);
router.use("/products", productsRoute);
router.use("/brands", brandsRoute);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
