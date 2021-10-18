const router = require("express").Router();

const { models: { Order, OrderItem, Product } } = require("../db");
const User = require("../db/models/User");

router.get("/", async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = await User.findByToken(token)

        const [activeorder] = await Order.findOrCreate({
            where: {
                userId: user.id,
                isCart: true
            },
            defaults: {
                userId: user.id
            },
            include: OrderItem
        });

        const cart = await OrderItem.findAll({
            where: {
                orderId: activeorder.id
            },
            include: Product
        })

        res.json(cart);
    }
    catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const product = req.body
        const token = req.headers.authorization;
        const user = await User.findByToken(token)

        const [usercart] = await Order.findOrCreate({
            where: {
                userId: user.id,
                isCart: true
            },
            defaults: {
                userId: user.id
            },
            include: OrderItem
        });

        const productExist = await OrderItem.findOne({
            where: {
                orderId: usercart.id,
                productId: product.productId
            }
        });

        let updatedItem;

        if (productExist) {
            const newquantity = productExist.quantity + (product.quantity * 1);
            await productExist.update({ ...productExist, quantity: newquantity })
            updatedItem = await productExist.save()
        }
        else {
            updatedItem = await OrderItem.create({ orderId: usercart.id, ...product })
        }

        updatedItem = await OrderItem.findOne({
            where: {
                id: updatedItem.id
            },
            include: Product
        })

        res.json(updatedItem);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;