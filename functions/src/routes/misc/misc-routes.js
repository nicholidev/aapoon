const { checkPhoneExistance } = require("./misc-controller");

const routesConfig = (app) => {
  app.get(
    "/misc/checkPhone/:phone",

    checkPhoneExistance
  );
};

module.exports = routesConfig;
