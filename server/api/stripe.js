const router = require("express").Router();

//Stripe payment
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)

router.get("/checkout-session", async (req, res, next) => {
    try {
        const { sessionId } = req.query;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        res.send(session);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;