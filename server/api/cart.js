const router = require("express").Router();

const { models: { Order, OrderItem, Product } } = require("../db");
const User = require("../db/models/User");

router.get("/", async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = await User.findByToken(token)

        const [cart] = await Order.findOrCreate({
            where: {
                userId: user.id,
                isCart: true
            },
            defaults: {
                userId: user.id
            },
            include: {
                model: OrderItem,
                include: {
                    model: Product
                }
            }
        });

        // const cart = await OrderItem.findAll({
        //     where: {
        //         orderId: activeorder.id
        //     },
        //     include: Product
        // })

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

        const [cart] = await Order.findOrCreate({
            where: {
                userId: user.id,
                isCart: true
            },
            defaults: {
                userId: user.id
            }
        });

        const productExist = await OrderItem.findOne({
            where: {
                orderId: cart.id,
                productId: product.productId
            }
        });

        if (productExist) {
            const newquantity = productExist.quantity + (product.quantity * 1);
            await productExist.update({ ...productExist, quantity: newquantity })
            await productExist.save()
        }
        else {
            await OrderItem.create({ orderId: cart.id, ...product })
        }

        const updateditems = await OrderItem.findAll({
            where: {
                orderId: cart.id
            },
            include: Product
        })

        res.json(updateditems);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;