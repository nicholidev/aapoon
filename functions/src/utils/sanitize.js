/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
const sanitize = (payload, fields = []) => {
  return fields.reduce((acc, curr) => {
    acc[curr] =
      typeof payload[curr] === "string" ? payload[curr].trim() : payload[curr];
    return acc;
  }, {});
};

module.exports = { sanitize };
