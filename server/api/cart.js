const router = require("express").Router();

const { models: { Order } } = require("../db");
const User = require("../db/models/User");

router.get("/", async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = await User.findByToken(token)

        const cart = await Order.findOrCreate({
            where: {
                userId: user.id,
                isCart: true
            },
            defaults: {
                userId: user.id,
                isCart: true
            }
        });
        res.json(cart);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;