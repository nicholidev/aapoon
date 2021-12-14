/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 Taras Mazepa. Contact address: taras@maze.pa .
 */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const express = require("express");

const { ErrorReporting } = require("@google-cloud/error-reporting");
const errors = new ErrorReporting();
admin.initializeApp();

const app = express();
app.use(cors);
app.use(errors.express);

exports.app = functions.https.onRequest(app);
