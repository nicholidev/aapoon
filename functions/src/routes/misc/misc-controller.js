const admin = require("firebase-admin");

const checkPhoneExistance = async (req, res) => {
  admin
    .auth()
    .getUserByPhoneNumber(req.params.phone)
    .then((user) => {
      if (user) res.status(200).send({ message: "exists" });
      else res.status(200).send({ message: "not exists" });
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

module.exports = { checkPhoneExistance };
