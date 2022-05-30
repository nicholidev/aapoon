/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */

const functions = require("firebase-functions");
const config = {
  stripeSecretKey: functions.config()?.stripe?.rkey,
  stripeWebhookSecret: functions.config()?.stripe?.webhookkey,
  productsCollectionPath: "products",
  customersCollectionPath: "customers",
  stripeConfigCollectionPath: "config",
  syncUsersOnCreate: process.env.SYNC_USERS_ON_CREATE === "Sync",
  autoDeleteUsers: process.env.DELETE_STRIPE_CUSTOMERS === "Auto delete",
};

module.exports=config
