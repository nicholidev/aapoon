/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// const isAuthenticated = require("../../auth/authenticated");
const {
  checkPhoneExistance,
  getCountry,
  sendOTP,
  verifyOTP,
  sendEmailInvite,
  acceptEmailInvite,
  InviteList,
} = require("./misc-controller");

const routesConfig = (app) => {
  app.get(
    "/misc/checkPhone/:phone/:email",

    checkPhoneExistance
  );
  app.post("/misc/send-otp", sendOTP);
  app.post("/misc/verify-otp", verifyOTP);
  app.post(
    // isAuthenticated,
    "/misc/send-invite",
    sendEmailInvite
  );
  app.post("/misc/accept-invite", acceptEmailInvite);
  app.get("/misc/get-country", getCountry);
  app.get("/misc/invite-list", InviteList);
};

module.exports = routesConfig;
