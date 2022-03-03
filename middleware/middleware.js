const jwt = require("jsonwebtoken");

const middleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(404).json({ message: "Cannot find user, Please login first" });
  }

  const user = jwt.decode(token, process.env.TOKEN);
  if (!user) {
    res.status(401).json({ message: `User not found!` });
  }
  req.payload = user;
  next();
};

module.exports = {
  middleware,
};
