/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// const isAuthenticated = require("../../auth/authenticated");
const {

    capture,
   
  } = require("./recording-controller");
  
  
  const routesConfig = (app) => {

    app.post("/recording/capture", capture);
 
  };
  
  module.exports = routesConfig;
  