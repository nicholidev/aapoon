/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 Taras Mazepa. Contact address: taras@maze.pa .
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
