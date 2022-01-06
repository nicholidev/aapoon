/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// const isAuthenticated = require("../../auth/authenticated");
const { instantMeeting, scheduleMeeting } = require("./meeting-controller");
const isAuthenticated = require("./../../auth/authenticated");
const routesConfig = (app) => {
  app.post("/meeting/instant", isAuthenticated, instantMeeting);
  app.post("/meeting/schedule", isAuthenticated, scheduleMeeting);
};

module.exports = routesConfig;
