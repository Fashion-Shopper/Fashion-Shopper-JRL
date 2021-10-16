const router = require('express').Router()
const { models: { User } } = require('../db')
const Order = require('../db/models/Order')
const OrderItem = require('../db/models/OrderItem')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'],
      // include: {
      //   model: Order,
      //   include: {
      //     model: OrderItem
      //   }
      // }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/',async (req, res, next) => {
  try {
    const users = await User.findByToken(req.headers.authorization);
    await user.update(req.body);
    res.send(user)
  } catch (err) {
    next(err)
  }
})
