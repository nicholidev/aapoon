/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 Taras Mazepa. Contact address: taras@maze.pa .
 */
const jwt = require("jsonwebtoken");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const USER_STATUS = require("../constants/user-status");

async function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  if (!authorization.startsWith("Bearer")) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const split = authorization.split("Bearer ");
  if (split.length !== 2) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const token = split[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    return next();
    // const querySnapshot = await db.collection("user").doc(decoded.id).get();
    // const userDoc = querySnapshot.data();
    // if (userDoc.status == USER_STATUS.active) {
    //   return next();
    // } else {
    //   return res.status(401).send({ message: "Unauthorized" });
    // }
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized" });
  }
}

module.exports = isAuthenticated;
