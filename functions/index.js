/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const express = require("express");

const miscRoutes = require("./src/routes/misc/misc-routes");
const meetingRoutes = require("./src/routes/meeting/meeting-route");
const { sendWelcomeEmail, updateUser } = require("./src/triggers/auth");
const { sendInviteEmail } = require("./src/triggers/invites");
const { sendHelpConfirmEmail } = require("./src/triggers/help");
const { ErrorReporting } = require("@google-cloud/error-reporting");
const errors = new ErrorReporting();
admin.initializeApp();

const app = express();
app.use(cors);
app.use(errors.express);
miscRoutes(app);
meetingRoutes(app);
exports.app = functions.https.onRequest(app);
exports.sendWelcomeEmail = sendWelcomeEmail;
exports.sendInviteeEmail = sendInviteEmail;
exports.sendHelpConfirmEmail = sendHelpConfirmEmail;
exports.updateUser = updateUser;
exports.stripe = require("./src/stripe/stripe-firebase-extensions/firestore-stripe-payments/functions/lib/index");
