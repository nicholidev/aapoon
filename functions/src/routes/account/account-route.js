/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// const isAuthenticated = require("../../auth/authenticated");
const { closeAccount } = require("./account-controller");

const routesConfig = (app) => {
  app.post("/account/close", closeAccount);
};

module.exports = routesConfig;
