const isAutho = (allowedRoles) => {
    return (req, res, next) => {
      console.log("User role:", req.user?.role); // Debugging line
      console.log("Allowed roles:", allowedRoles);
  
      if (req.user && allowedRoles.includes(req.user.role)) {
        return next(); // Allow the request to proceed
      } else {
        return res.status(403).json({ msg: "Access forbidden - Insufficient privileges" });
      }
    };
  };
  
  module.exports = isAutho;
  