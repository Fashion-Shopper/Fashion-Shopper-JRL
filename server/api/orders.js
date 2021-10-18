const router = require("express").Router();

const { models: { Order } } = require("../db");
const OrderItem = require("../db/models/OrderItem");
const Product = require("../db/models/Product");
const User = require("../db/models/User");

router.get("/", async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = await User.findByToken(token)

        const orders = await Order.findAll({
            include: {
                model: OrderItem,
                include: {
                    model: Product
                }
            },
            where: {
                userId: user.id
            }
        });
        res.json(orders);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;