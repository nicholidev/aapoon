/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
"use strict";
/*
 * Copyright 2020 Stripe, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
exports.__esModule = true;
exports.webhookHandlerError =
  exports.webhookHandlerSucceeded =
  exports.startWebhookEventProcessing =
  exports.badWebhookSecret =
  exports.userCustomClaimSet =
  exports.firestoreDocDeleted =
  exports.firestoreDocCreated =
  exports.billingPortalLinkCreationError =
  exports.createdBillingPortalLink =
  exports.checkoutSessionCreationError =
  exports.checkoutSessionCreated =
  exports.creatingCheckoutSession =
  exports.customerDeleted =
  exports.customerCreated =
  exports.customerDeletionError =
  exports.customerCreationError =
  exports.creatingCustomer =
    void 0;
var firebase_functions_1 = require("firebase-functions");
exports.creatingCustomer = function (uid) {
  firebase_functions_1.logger.log(
    "\u2699\uFE0F Creating customer object for [" + uid + "]."
  );
};
exports.customerCreationError = function (error, uid) {
  firebase_functions_1.logger.error(
    "\u2757\uFE0F[Error]: Failed to create customer for [" + uid + "]:",
    error.message
  );
};
exports.customerDeletionError = function (error, uid) {
  firebase_functions_1.logger.error(
    "\u2757\uFE0F[Error]: Failed to delete customer for [" + uid + "]:",
    error.message
  );
};
function customerCreated(id, livemode) {
  firebase_functions_1.logger.log(
    "\u2705Created a new customer: https://dashboard.stripe.com" +
      (livemode ? "" : "/test") +
      "/customers/" +
      id +
      "."
  );
}
exports.customerCreated = customerCreated;
function customerDeleted(id) {
  firebase_functions_1.logger.log(
    "\uD83D\uDDD1Deleted Stripe customer [" + id + "]"
  );
}
exports.customerDeleted = customerDeleted;
function creatingCheckoutSession(docId) {
  firebase_functions_1.logger.log(
    "\u2699\uFE0F Creating checkout session for doc [" + docId + "].========================================================"
  );
}
exports.creatingCheckoutSession = creatingCheckoutSession;
function checkoutSessionCreated(docId) {
  firebase_functions_1.logger.log(
    "\u2705Checkout session created for doc [" + docId + "]."
  );
}
exports.checkoutSessionCreated = checkoutSessionCreated;
function checkoutSessionCreationError(docId, error) {
  firebase_functions_1.logger.error(
    "\u2757\uFE0F[Error]: Checkout session creation failed for doc [" +
      docId +
      "]:",
    error.message
  );
}
exports.checkoutSessionCreationError = checkoutSessionCreationError;
function createdBillingPortalLink(uid) {
  firebase_functions_1.logger.log(
    "\u2705Created billing portal link for user [" + uid + "]."
  );
}
exports.createdBillingPortalLink = createdBillingPortalLink;
function billingPortalLinkCreationError(uid, error) {
  firebase_functions_1.logger.error(
    "\u2757\uFE0F[Error]: Customer portal link creation failed for user [" +
      uid +
      "]:",
    error.message
  );
}
exports.billingPortalLinkCreationError = billingPortalLinkCreationError;
function firestoreDocCreated(collection, docId) {
  firebase_functions_1.logger.log(
    "\uD83D\uDD25\uD83D\uDCC4 Added doc [" +
      docId +
      "] to collection [" +
      collection +
      "] in Firestore."
  );
}
exports.firestoreDocCreated = firestoreDocCreated;
function firestoreDocDeleted(collection, docId) {
  firebase_functions_1.logger.log(
    "\uD83D\uDDD1\uD83D\uDD25\uD83D\uDCC4 Deleted doc [" +
      docId +
      "] from collection [" +
      collection +
      "] in Firestore."
  );
}
exports.firestoreDocDeleted = firestoreDocDeleted;
function userCustomClaimSet(uid, claimKey, claimValue) {
  firebase_functions_1.logger.log(
    "\uD83D\uDEA6 Added custom claim [" +
      claimKey +
      ": " +
      claimValue +
      "] for user [" +
      uid +
      "]."
  );
}
exports.userCustomClaimSet = userCustomClaimSet;
function badWebhookSecret(error) {
  firebase_functions_1.logger.error(
    "❗️[Error]: Webhook signature verification failed. Is your Stripe webhook secret parameter configured correctly?",
    error.message
  );
}
exports.badWebhookSecret = badWebhookSecret;
function startWebhookEventProcessing(id, type) {
  firebase_functions_1.logger.log(
    "\u2699\uFE0F Handling Stripe event [" + id + "] of type [" + type + "]."
  );
}
exports.startWebhookEventProcessing = startWebhookEventProcessing;
function webhookHandlerSucceeded(id, type) {
  firebase_functions_1.logger.log(
    "\u2705Successfully handled Stripe event [" +
      id +
      "] of type [" +
      type +
      "]."
  );
}
exports.webhookHandlerSucceeded = webhookHandlerSucceeded;
function webhookHandlerError(error, id, type) {
  firebase_functions_1.logger.error(
    "\u2757\uFE0F[Error]: Webhook handler for  Stripe event [" +
      id +
      "] of type [" +
      type +
      "] failed:",
    error.message
  );
}
exports.webhookHandlerError = webhookHandlerError;
