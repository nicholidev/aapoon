/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
exports["default"] = {
  stripeSecretKey: process.env.STRIPE_API_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  productsCollectionPath: "collection",
  customersCollectionPath: "customer",
  stripeConfigCollectionPath: "config",
  syncUsersOnCreate: process.env.SYNC_USERS_ON_CREATE === "Sync",
  autoDeleteUsers: process.env.DELETE_STRIPE_CUSTOMERS === "Auto delete",
};
