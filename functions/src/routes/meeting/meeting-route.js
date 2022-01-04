/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// const isAuthenticated = require("../../auth/authenticated");
const { instantMeeting } = require("./misc-controller");

const routesConfig = (app) => {
  app.post(
    "/meeting/instant",

    instantMeeting
  );
};

module.exports = routesConfig;
