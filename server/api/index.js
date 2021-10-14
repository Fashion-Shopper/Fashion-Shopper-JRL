const router = require("express").Router();
const usersRoute = require("./users");
const productsRoute = require("./products");
const ordersRoute = require("./orders");
module.exports = router;

router.use("/users", usersRoute);
router.use("/products", productsRoute);
router.use("/orders", ordersRoute);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
