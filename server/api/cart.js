const router = require("express").Router();
const { models: { Order, OrderItem, Product }, } = require("../db");
const { isLoggedIn } = require("../middleware");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;

    const [cart] = await Order.findOrCreate({
      where: {
        userId: user.id,
        isCart: true,
      },
      defaults: {
        userId: user.id,
      },
      include: {
        model: OrderItem,
        include: {
          model: Product,
        },
      },
      order: [[OrderItem, "createdAt", "DESC"]],
    });

    // const cart = await OrderItem.findAll({
    //     where: {
    //         orderId: activeorder.id
    //     },
    //     include: Product
    // })

    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const addOrderItem = req.body;
    const user = req.user;

    //// Find user order that is a cart ///////
    const [cart] = await Order.findOrCreate({
      where: {
        userId: user.id,
        isCart: true,
      },
      defaults: {
        userId: user.id,
      },
    });

    /////// Look for orderitem that has productId inside cart //////
    const orderItemExist = await OrderItem.findOne({
      where: {
        orderId: cart.id,
        productId: addOrderItem.productId,
      },
    });

    /////////// Check if orderitem exist and just increse quantity /////
    if (orderItemExist) {
      const newquantity = orderItemExist.quantity + addOrderItem.quantity * 1;
      await orderItemExist.update({ ...orderItemExist, quantity: newquantity });
    }
    ///////////// Or just add new orderitem to the cart order ////////
    else {
      await OrderItem.create({ orderId: cart.id, ...addOrderItem });
    }

    ////// Get all orderitems in the cart order //////
    const updateditems = await OrderItem.findAll({
      where: {
        orderId: cart.id,
      },
      order: [["createdAt", "DESC"]],
      include: Product,
    });

    res.json(updateditems);
  } catch (err) {
    next(err);
  }
});

router.put("/", isLoggedIn, async (req, res, next) => {
  try {
    const updateOrderItem = req.body;
    // const user = req.user;

    // const cart = await Order.findOne({
    //     where: {
    //         userId: user.id,
    //         isCart: true
    //     }
    // });

    const orderItemToUpdate = await OrderItem.findOne({
      where: {
        id: updateOrderItem.id,
        // productId: updateOrderItem.productId
      },
    });

    await orderItemToUpdate.update(updateOrderItem);

    const updatedItems = await OrderItem.findAll({
      where: {
        orderId: orderItemToUpdate.orderId,
      },
      order: [["createdAt", "DESC"]],
      include: Product,
    });

    res.json(updatedItems);
  } catch (err) {
    next(err);
  }
});

router.delete("/:orderItemId", isLoggedIn, async (req, res, next) => {
  try {
    const { orderItemId } = req.params;
    // const user = req.user;

    // const cart = await Order.findOne({
    //     where: {
    //         userId: user.id,
    //         isCart: true
    //     }
    // });

    const orderItemToDelete = await OrderItem.findByPk(orderItemId, {
      // where: {
      //     orderId: cart.id,
      // }
    });
    await orderItemToDelete.destroy();

    const updateditems = await OrderItem.findAll({
      where: {
        orderId: orderItemToDelete.orderId,
      },
      order: [["createdAt", "DESC"]],
      include: Product,
    });

    res.json(updateditems);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
