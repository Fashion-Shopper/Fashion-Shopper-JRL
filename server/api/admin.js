const router = require("express").Router();
const { models: { Order, User } } = require("../db");

//Middlewares
const { isLoggedIn, isAdmin } = require('../middleware');
const { pluralize } = require('inflection');

//Do three Routes in a more efficient way (dynamic routes)
const obj = {
    orders: Order,
    //orderItems: OrderItem,
    users: User
}

Object.entries(obj).forEach(entry => {
    const _path = pluralize(entry[0]);
    const model = entry[1];
    router.get(`/${_path}`, isLoggedIn, isAdmin, async (req, res, next) => {
        try {
            res.send(await model.findAll())
        }
        catch (err) {
            next(err);
        }
    });
    router.delete(`/${_path}/:id`, isLoggedIn, isAdmin, async (req, res, next) => {
        try {
            const item = await model.findByPk(res.params.id)
            await item.destroy()
            res.sendStatus(201)
        }
        catch (err) {
            next(err);
        }
    });
})


//Routes 

// router.get("/orders", isLoggedIn, isAdmin, async (req, res, next) => {
//     try {
//         const orders = await Order.findAll()
//         res.json(orders);
//     }
//     catch (err) {
//         next(err);
//     }
// });

// router.get("/users", isLoggedIn, isAdmin, async (req, res, next) => {
//     try {
//         const users = await User.findAll()
//         res.json(userss);
//     }
//     catch (err) {
//         next(err);
//     }
// });

// router.get("/products", isLoggedIn, isAdmin, async (req, res, next) => {
//     try {
//         const products = await Product.findAll()
//         res.json(products);
//     }
//     catch (err) {
//         next(err);
//     }
// });

module.exports = router;