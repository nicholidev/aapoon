/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
export default {
  stripeSecretKey: process.env.STRIPE_API_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  productsCollectionPath: process.env.PRODUCTS_COLLECTION,
  customersCollectionPath: process.env.CUSTOMERS_COLLECTION,
  stripeConfigCollectionPath: process.env.STRIPE_CONFIG_COLLECTION,
  syncUsersOnCreate: process.env.SYNC_USERS_ON_CREATE === 'Sync',
  autoDeleteUsers: process.env.DELETE_STRIPE_CUSTOMERS === 'Auto delete',
};
