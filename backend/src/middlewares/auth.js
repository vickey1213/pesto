const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.SECRET_KEY;
console.log(key);
function auth(req, res, next) {
  const token = req.headers["x-authorization"];
  if (token) {
    const finalToken = token.split(" ")[1];
    try {
      const decodedToken = jwt.verify(finalToken, key);

      const username = decodedToken.username;
      const userID = decodedToken.id;

      req.username = username;
      req.id = userID;
      next();
    } catch (err) {
      res.send({
        status: false,
        message: "Invalid token!",
      });
    }
  } else {
    res.send({
      status: false,
      message: "No token found!",
    });
  }
}

module.exports = auth;
