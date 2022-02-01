/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
const isAuthorized = (permittedRoles) => {
  return (req, res, next) => {
    const { user } = req;
    const hasRole = permittedRoles.includes(user.role);
    if (hasRole) {
      next(); // has the role, can continue
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
};

module.exports = isAuthorized;
