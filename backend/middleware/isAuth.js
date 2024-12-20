const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");  // Ensure cookie-parser is used in your Express app

const isAuth = (req, res, next) => {
  const token = req.cookies.auth_token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user to request object
    console.log('Decoded user:', req.user); // Debugging line
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = isAuth;
