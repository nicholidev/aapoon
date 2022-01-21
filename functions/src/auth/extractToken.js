/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
const jwt = require("jsonwebtoken");
const functions = require("firebase-functions");

async function extractToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  if (!authorization.startsWith("Bearer")) {
    return next();
  }

  const split = authorization.split("Bearer ");
  if (split.length !== 2) {
    return next();
  }

  const token = split[1];
  try {
    const decoded = jwt.verify(token, functions.config().token.key);
    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  }
}

module.exports = extractToken;
