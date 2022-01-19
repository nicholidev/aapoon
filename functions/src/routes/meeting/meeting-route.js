/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// const isAuthenticated = require("../../auth/authenticated");
const {
  instantMeeting,
  scheduleMeeting,
  joinMeeting,
} = require("./meeting-controller");
const isAuthenticated = require("./../../auth/authenticated");
const routesConfig = (app) => {
  app.post("/meeting/instant", isAuthenticated, instantMeeting);
  app.post("/meeting/schedule", isAuthenticated, scheduleMeeting);
  app.post("/meeting/join", isAuthenticated, joinMeeting);
};

module.exports = routesConfig;
