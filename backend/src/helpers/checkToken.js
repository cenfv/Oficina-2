const jwt = require("jsonwebtoken");

exports.checkTokenBearer = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ msg: "User not authenticated", redirect_url: "/login" });
  }
  try {
    const secret = process.env.SECRET;
    const res = jwt.verify(token, secret);
    req.id = res.id;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};
