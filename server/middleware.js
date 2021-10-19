const User = require("./db/models/User");

//Middlewares

const isLoggedIn = async (req, res, next) => {
  //this is a middleware to dry things out
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next(); //call next
  } catch (ex) {
    next(ex);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.dataValues.isAdmin) {
    return next();
  }
  const error = new Error("must be Admin!");
  error.status = 401;
  next(error);
};

module.exports = {
  isLoggedIn,
  isAdmin,
};
