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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.onCustomerDataDeleted = exports.onUserDeleted = exports.handleWebhookEvents = void 0;
var admin = require("firebase-admin");
var functions = require("firebase-functions");
var stripe_1 = require("stripe");
var logs = require("./logs");
var config_1 = require("./config");
var apiVersion = '2020-08-27';
var stripe = new stripe_1["default"](config_1["default"].stripeSecretKey, {
    apiVersion: apiVersion,
    // Register extension as a Stripe plugin
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
        name: 'Firebase firestore-stripe-payments',
        version: '0.2.4'
    }
});
admin.initializeApp();
/**
 * Create a customer object in Stripe when a user is created.
 */
var createCustomerRecord = function (_a) {
    var email = _a.email, uid = _a.uid, phone = _a.phone;
    return __awaiter(void 0, void 0, void 0, function () {
        var customerData, customer, customerRecord, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    logs.creatingCustomer(uid);
                    customerData = {
                        metadata: {
                            firebaseUID: uid
                        }
                    };
                    if (email)
                        customerData.email = email;
                    if (phone)
                        customerData.phone = phone;
                    return [4 /*yield*/, stripe.customers.create(customerData)];
                case 1:
                    customer = _b.sent();
                    customerRecord = {
                        email: customer.email,
                        stripeId: customer.id,
                        stripeLink: "https://dashboard.stripe.com" + (customer.livemode ? '' : '/test') + "/customers/" + customer.id
                    };
                    if (phone)
                        customerRecord.phone = phone;
                    return [4 /*yield*/, admin
                            .firestore()
                            .collection(config_1["default"].customersCollectionPath)
                            .doc(uid)
                            .set(customerRecord, { merge: true })];
                case 2:
                    _b.sent();
                    logs.customerCreated(customer.id, customer.livemode);
                    return [2 /*return*/, customerRecord];
                case 3:
                    error_1 = _b.sent();
                    logs.customerCreationError(error_1, uid);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.createCustomer = functions.auth
    .user()
    .onCreate(function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var email, uid, phoneNumber;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!config_1["default"].syncUsersOnCreate)
                    return [2 /*return*/];
                email = user.email, uid = user.uid, phoneNumber = user.phoneNumber;
                return [4 /*yield*/, createCustomerRecord({
                        email: email,
                        uid: uid,
                        phone: phoneNumber
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
/**
 * Create a CheckoutSession or PaymentIntent based on which client is being used.
 */
exports.createCheckoutSession = functions.firestore
    .document("/" + config_1["default"].customersCollectionPath + "/{uid}/checkout_sessions/{id}")
    .onCreate(function (snap, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, client, amount, currency, _c, mode, price, success_url, cancel_url, _d, quantity, payment_method_types, _e, shipping_rates, _f, metadata, _g, automatic_payment_methods, _h, automatic_tax, _j, tax_rates, _k, tax_id_collection, _l, allow_promotion_codes, _m, trial_from_plan, line_items, _o, billing_address_collection, _p, collect_shipping_address, _q, customer_update, _r, locale, promotion_code, client_reference_id, setup_future_usage, customerRecord, _s, email, phoneNumber, customer, shippingCountries, _t, sessionCreateParams, session, paymentIntentClientSecret, setupIntentClientSecret, paymentIntentCreateParams, paymentIntent, setupIntent, ephemeralKey, error_2;
    var _u, _v;
    return __generator(this, function (_w) {
        switch (_w.label) {
            case 0:
                _a = snap.data(), _b = _a.client, client = _b === void 0 ? 'web' : _b, amount = _a.amount, currency = _a.currency, _c = _a.mode, mode = _c === void 0 ? 'subscription' : _c, price = _a.price, success_url = _a.success_url, cancel_url = _a.cancel_url, _d = _a.quantity, quantity = _d === void 0 ? 1 : _d, payment_method_types = _a.payment_method_types, _e = _a.shipping_rates, shipping_rates = _e === void 0 ? [] : _e, _f = _a.metadata, metadata = _f === void 0 ? {} : _f, _g = _a.automatic_payment_methods, automatic_payment_methods = _g === void 0 ? { enabled: true } : _g, _h = _a.automatic_tax, automatic_tax = _h === void 0 ? false : _h, _j = _a.tax_rates, tax_rates = _j === void 0 ? [] : _j, _k = _a.tax_id_collection, tax_id_collection = _k === void 0 ? false : _k, _l = _a.allow_promotion_codes, allow_promotion_codes = _l === void 0 ? false : _l, _m = _a.trial_from_plan, trial_from_plan = _m === void 0 ? true : _m, line_items = _a.line_items, _o = _a.billing_address_collection, billing_address_collection = _o === void 0 ? 'required' : _o, _p = _a.collect_shipping_address, collect_shipping_address = _p === void 0 ? false : _p, _q = _a.customer_update, customer_update = _q === void 0 ? {} : _q, _r = _a.locale, locale = _r === void 0 ? 'auto' : _r, promotion_code = _a.promotion_code, client_reference_id = _a.client_reference_id, setup_future_usage = _a.setup_future_usage;
                _w.label = 1;
            case 1:
                _w.trys.push([1, 21, , 23]);
                logs.creatingCheckoutSession(context.params.id);
                return [4 /*yield*/, snap.ref.parent.parent.get()];
            case 2:
                customerRecord = (_w.sent()).data();
                if (!!(customerRecord === null || customerRecord === void 0 ? void 0 : customerRecord.stripeId)) return [3 /*break*/, 5];
                return [4 /*yield*/, admin
                        .auth()
                        .getUser(context.params.uid)];
            case 3:
                _s = _w.sent(), email = _s.email, phoneNumber = _s.phoneNumber;
                return [4 /*yield*/, createCustomerRecord({
                        uid: context.params.uid,
                        email: email,
                        phone: phoneNumber
                    })];
            case 4:
                customerRecord = _w.sent();
                _w.label = 5;
            case 5:
                customer = customerRecord.stripeId;
                if (!(client === 'web')) return [3 /*break*/, 11];
                if (!collect_shipping_address) return [3 /*break*/, 7];
                return [4 /*yield*/, admin
                        .firestore()
                        .collection(config_1["default"].stripeConfigCollectionPath ||
                        config_1["default"].productsCollectionPath)
                        .doc('shipping_countries')
                        .get()];
            case 6:
                _t = (_v = (_u = (_w.sent()).data()) === null || _u === void 0 ? void 0 : _u['allowed_countries']) !== null && _v !== void 0 ? _v : [];
                return [3 /*break*/, 8];
            case 7:
                _t = [];
                _w.label = 8;
            case 8:
                shippingCountries = _t;
                sessionCreateParams = {
                    billing_address_collection: billing_address_collection,
                    shipping_address_collection: { allowed_countries: shippingCountries },
                    shipping_rates: shipping_rates,
                    customer: customer,
                    customer_update: customer_update,
                    line_items: line_items
                        ? line_items
                        : [
                            {
                                price: price,
                                quantity: quantity
                            },
                        ],
                    mode: mode,
                    success_url: success_url,
                    cancel_url: cancel_url,
                    locale: locale
                };
                if (payment_method_types) {
                    sessionCreateParams.payment_method_types = payment_method_types;
                }
                if (mode === 'subscription') {
                    sessionCreateParams.subscription_data = {
                        trial_from_plan: trial_from_plan,
                        metadata: metadata
                    };
                    if (!automatic_tax) {
                        sessionCreateParams.subscription_data.default_tax_rates = tax_rates;
                    }
                }
                else if (mode === 'payment') {
                    sessionCreateParams.payment_intent_data = __assign({ metadata: metadata }, (setup_future_usage && { setup_future_usage: setup_future_usage }));
                }
                if (automatic_tax) {
                    sessionCreateParams.automatic_tax = {
                        enabled: true
                    };
                    sessionCreateParams.customer_update.name = 'auto';
                    sessionCreateParams.customer_update.address = 'auto';
                    sessionCreateParams.customer_update.shipping = 'auto';
                }
                if (tax_id_collection) {
                    sessionCreateParams.tax_id_collection = {
                        enabled: true
                    };
                    sessionCreateParams.customer_update.name = 'auto';
                    sessionCreateParams.customer_update.address = 'auto';
                    sessionCreateParams.customer_update.shipping = 'auto';
                }
                if (promotion_code) {
                    sessionCreateParams.discounts = [{ promotion_code: promotion_code }];
                }
                else {
                    sessionCreateParams.allow_promotion_codes = allow_promotion_codes;
                }
                if (client_reference_id)
                    sessionCreateParams.client_reference_id = client_reference_id;
                return [4 /*yield*/, stripe.checkout.sessions.create(sessionCreateParams, { idempotencyKey: context.params.id })];
            case 9:
                session = _w.sent();
                return [4 /*yield*/, snap.ref.set({
                        client: client,
                        mode: mode,
                        sessionId: session.id,
                        url: session.url,
                        created: admin.firestore.Timestamp.now()
                    }, { merge: true })];
            case 10:
                _w.sent();
                return [3 /*break*/, 20];
            case 11:
                if (!(client === 'mobile')) return [3 /*break*/, 19];
                paymentIntentClientSecret = null;
                setupIntentClientSecret = null;
                if (!(mode === 'payment')) return [3 /*break*/, 13];
                if (!amount || !currency) {
                    throw new Error("When using 'client:mobile' and 'mode:payment' you must specify amount and currency!");
                }
                paymentIntentCreateParams = __assign({ amount: amount,
                    currency: currency,
                    customer: customer,
                    metadata: metadata }, (setup_future_usage && { setup_future_usage: setup_future_usage }));
                if (payment_method_types) {
                    paymentIntentCreateParams.payment_method_types =
                        payment_method_types;
                }
                else {
                    paymentIntentCreateParams.automatic_payment_methods =
                        automatic_payment_methods;
                }
                return [4 /*yield*/, stripe.paymentIntents.create(paymentIntentCreateParams)];
            case 12:
                paymentIntent = _w.sent();
                paymentIntentClientSecret = paymentIntent.client_secret;
                return [3 /*break*/, 16];
            case 13:
                if (!(mode === 'setup')) return [3 /*break*/, 15];
                return [4 /*yield*/, stripe.setupIntents.create({
                        customer: customer,
                        metadata: metadata,
                        payment_method_types: payment_method_types !== null && payment_method_types !== void 0 ? payment_method_types : ['card']
                    })];
            case 14:
                setupIntent = _w.sent();
                setupIntentClientSecret = setupIntent.client_secret;
                return [3 /*break*/, 16];
            case 15: throw new Error("Mode '" + mode + " is not supported for 'client:mobile'!");
            case 16: return [4 /*yield*/, stripe.ephemeralKeys.create({ customer: customer }, { apiVersion: apiVersion })];
            case 17:
                ephemeralKey = _w.sent();
                return [4 /*yield*/, snap.ref.set({
                        client: client,
                        mode: mode,
                        customer: customer,
                        created: admin.firestore.Timestamp.now(),
                        ephemeralKeySecret: ephemeralKey.secret,
                        paymentIntentClientSecret: paymentIntentClientSecret,
                        setupIntentClientSecret: setupIntentClientSecret
                    }, { merge: true })];
            case 18:
                _w.sent();
                return [3 /*break*/, 20];
            case 19: throw new Error("Client " + client + " is not supported. Only 'web' or ' mobile' is supported!");
            case 20:
                logs.checkoutSessionCreated(context.params.id);
                return [2 /*return*/];
            case 21:
                error_2 = _w.sent();
                logs.checkoutSessionCreationError(context.params.id, error_2);
                return [4 /*yield*/, snap.ref.set({ error: { message: error_2.message } }, { merge: true })];
            case 22:
                _w.sent();
                return [3 /*break*/, 23];
            case 23: return [2 /*return*/];
        }
    });
}); });
/**
 * Create a billing portal link
 */
exports.createPortalLink = functions.https.onCall(function (data, context) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, return_url, _a, locale, configuration, customer, params, session, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                // Checking that the user is authenticated.
                if (!context.auth) {
                    // Throwing an HttpsError so that the client gets the error details.
                    throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated!');
                }
                uid = context.auth.uid;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                if (!uid)
                    throw new Error('Not authenticated!');
                return_url = data.returnUrl, _a = data.locale, locale = _a === void 0 ? 'auto' : _a, configuration = data.configuration;
                return [4 /*yield*/, admin
                        .firestore()
                        .collection(config_1["default"].customersCollectionPath)
                        .doc(uid)
                        .get()];
            case 2:
                customer = (_b.sent()).data().stripeId;
                params = {
                    customer: customer,
                    return_url: return_url,
                    locale: locale
                };
                if (configuration) {
                    params.configuration = configuration;
                }
                return [4 /*yield*/, stripe.billingPortal.sessions.create(params)];
            case 3:
                session = _b.sent();
                logs.createdBillingPortalLink(uid);
                return [2 /*return*/, session];
            case 4:
                error_3 = _b.sent();
                logs.billingPortalLinkCreationError(uid, error_3);
                throw new functions.https.HttpsError('internal', error_3.message);
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * Prefix Stripe metadata keys with `stripe_metadata_` to be spread onto Product and Price docs in Cloud Firestore.
 */
var prefixMetadata = function (metadata) {
    return Object.keys(metadata).reduce(function (prefixedMetadata, key) {
        prefixedMetadata["stripe_metadata_" + key] = metadata[key];
        return prefixedMetadata;
    }, {});
};
/**
 * Create a Product record in Firestore based on a Stripe Product object.
 */
var createProductRecord = function (product) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firebaseRole, rawMetadata, productData;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = product.metadata, firebaseRole = _a.firebaseRole, rawMetadata = __rest(_a, ["firebaseRole"]);
                productData = __assign({ active: product.active, name: product.name, description: product.description, role: firebaseRole !== null && firebaseRole !== void 0 ? firebaseRole : null, images: product.images, metadata: product.metadata, tax_code: (_b = product.tax_code) !== null && _b !== void 0 ? _b : null }, prefixMetadata(rawMetadata));
                return [4 /*yield*/, admin
                        .firestore()
                        .collection(config_1["default"].productsCollectionPath)
                        .doc(product.id)
                        .set(productData, { merge: true })];
            case 1:
                _c.sent();
                logs.firestoreDocCreated(config_1["default"].productsCollectionPath, product.id);
                return [2 /*return*/];
        }
    });
}); };
/**
 * Create a price (billing price plan) and insert it into a subcollection in Products.
 */
var insertPriceRecord = function (price) { return __awaiter(void 0, void 0, void 0, function () {
    var priceData, dbRef;
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                if (!(price.billing_scheme === 'tiered')) return [3 /*break*/, 2];
                return [4 /*yield*/, stripe.prices.retrieve(price.id, { expand: ['tiers'] })];
            case 1:
                // Tiers aren't included by default, we need to retireve and expand.
                price = _j.sent();
                _j.label = 2;
            case 2:
                priceData = __assign({ active: price.active, billing_scheme: price.billing_scheme, tiers_mode: price.tiers_mode, tiers: (_a = price.tiers) !== null && _a !== void 0 ? _a : null, currency: price.currency, description: price.nickname, type: price.type, unit_amount: price.unit_amount, recurring: price.recurring, interval: (_c = (_b = price.recurring) === null || _b === void 0 ? void 0 : _b.interval) !== null && _c !== void 0 ? _c : null, interval_count: (_e = (_d = price.recurring) === null || _d === void 0 ? void 0 : _d.interval_count) !== null && _e !== void 0 ? _e : null, trial_period_days: (_g = (_f = price.recurring) === null || _f === void 0 ? void 0 : _f.trial_period_days) !== null && _g !== void 0 ? _g : null, transform_quantity: price.transform_quantity, tax_behavior: (_h = price.tax_behavior) !== null && _h !== void 0 ? _h : null, metadata: price.metadata, product: price.product }, prefixMetadata(price.metadata));
                dbRef = admin
                    .firestore()
                    .collection(config_1["default"].productsCollectionPath)
                    .doc(price.product)
                    .collection('prices');
                return [4 /*yield*/, dbRef.doc(price.id).set(priceData, { merge: true })];
            case 3:
                _j.sent();
                logs.firestoreDocCreated('prices', price.id);
                return [2 /*return*/];
        }
    });
}); };
/**
 * Insert tax rates into the products collection in Cloud Firestore.
 */
var insertTaxRateRecord = function (taxRate) { return __awaiter(void 0, void 0, void 0, function () {
    var taxRateData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taxRateData = __assign(__assign({}, taxRate), prefixMetadata(taxRate.metadata));
                delete taxRateData.metadata;
                return [4 /*yield*/, admin
                        .firestore()
                        .collection(config_1["default"].productsCollectionPath)
                        .doc('tax_rates')
                        .collection('tax_rates')
                        .doc(taxRate.id)
                        .set(taxRateData)];
            case 1:
                _a.sent();
                logs.firestoreDocCreated('tax_rates', taxRate.id);
                return [2 /*return*/];
        }
    });
}); };
/**
 * Copies the billing details from the payment method to the customer object.
 */
var copyBillingDetailsToCustomer = function (payment_method) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, _a, name, phone, address;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                customer = payment_method.customer;
                _a = payment_method.billing_details, name = _a.name, phone = _a.phone, address = _a.address;
                return [4 /*yield*/, stripe.customers.update(customer, { name: name, phone: phone, address: address })];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
/**
 * Manage subscription status changes.
 */
var manageSubscriptionStatusChange = function (subscriptionId, customerId, createAction) { return __awaiter(void 0, void 0, void 0, function () {
    var customersSnap, uid, subscription, price, prices, _i, _a, item, product, role, subsDbRef, subscriptionData, customClaims, error_4;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, admin
                    .firestore()
                    .collection(config_1["default"].customersCollectionPath)
                    .where('stripeId', '==', customerId)
                    .get()];
            case 1:
                customersSnap = _d.sent();
                if (customersSnap.size !== 1) {
                    throw new Error('User not found!');
                }
                uid = customersSnap.docs[0].id;
                return [4 /*yield*/, stripe.subscriptions.retrieve(subscriptionId, {
                        expand: ['default_payment_method', 'items.data.price.product']
                    })];
            case 2:
                subscription = _d.sent();
                price = subscription.items.data[0].price;
                prices = [];
                for (_i = 0, _a = subscription.items.data; _i < _a.length; _i++) {
                    item = _a[_i];
                    prices.push(admin
                        .firestore()
                        .collection(config_1["default"].productsCollectionPath)
                        .doc(item.price.product.id)
                        .collection('prices')
                        .doc(item.price.id));
                }
                product = price.product;
                role = (_b = product.metadata.firebaseRole) !== null && _b !== void 0 ? _b : null;
                subsDbRef = customersSnap.docs[0].ref
                    .collection('subscriptions')
                    .doc(subscription.id);
                subscriptionData = {
                    metadata: subscription.metadata,
                    role: role,
                    status: subscription.status,
                    stripeLink: "https://dashboard.stripe.com" + (subscription.livemode ? '' : '/test') + "/subscriptions/" + subscription.id,
                    product: admin
                        .firestore()
                        .collection(config_1["default"].productsCollectionPath)
                        .doc(product.id),
                    price: admin
                        .firestore()
                        .collection(config_1["default"].productsCollectionPath)
                        .doc(product.id)
                        .collection('prices')
                        .doc(price.id),
                    prices: prices,
                    quantity: (_c = subscription.items.data[0].quantity) !== null && _c !== void 0 ? _c : null,
                    items: subscription.items.data,
                    cancel_at_period_end: subscription.cancel_at_period_end,
                    cancel_at: subscription.cancel_at
                        ? admin.firestore.Timestamp.fromMillis(subscription.cancel_at * 1000)
                        : null,
                    canceled_at: subscription.canceled_at
                        ? admin.firestore.Timestamp.fromMillis(subscription.canceled_at * 1000)
                        : null,
                    current_period_start: admin.firestore.Timestamp.fromMillis(subscription.current_period_start * 1000),
                    current_period_end: admin.firestore.Timestamp.fromMillis(subscription.current_period_end * 1000),
                    created: admin.firestore.Timestamp.fromMillis(subscription.created * 1000),
                    ended_at: subscription.ended_at
                        ? admin.firestore.Timestamp.fromMillis(subscription.ended_at * 1000)
                        : null,
                    trial_start: subscription.trial_start
                        ? admin.firestore.Timestamp.fromMillis(subscription.trial_start * 1000)
                        : null,
                    trial_end: subscription.trial_end
                        ? admin.firestore.Timestamp.fromMillis(subscription.trial_end * 1000)
                        : null
                };
                return [4 /*yield*/, subsDbRef.set(subscriptionData)];
            case 3:
                _d.sent();
                logs.firestoreDocCreated('subscriptions', subscription.id);
                if (!role) return [3 /*break*/, 11];
                _d.label = 4;
            case 4:
                _d.trys.push([4, 10, , 11]);
                return [4 /*yield*/, admin.auth().getUser(uid)];
            case 5:
                customClaims = (_d.sent()).customClaims;
                if (!['trialing', 'active'].includes(subscription.status)) return [3 /*break*/, 7];
                logs.userCustomClaimSet(uid, 'stripeRole', role);
                return [4 /*yield*/, admin
                        .auth()
                        .setCustomUserClaims(uid, __assign(__assign({}, customClaims), { stripeRole: role }))];
            case 6:
                _d.sent();
                return [3 /*break*/, 9];
            case 7:
                logs.userCustomClaimSet(uid, 'stripeRole', 'null');
                return [4 /*yield*/, admin
                        .auth()
                        .setCustomUserClaims(uid, __assign(__assign({}, customClaims), { stripeRole: null }))];
            case 8:
                _d.sent();
                _d.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                error_4 = _d.sent();
                // User has been deleted, simply return.
                return [2 /*return*/];
            case 11:
                if (!(createAction && subscription.default_payment_method)) return [3 /*break*/, 13];
                return [4 /*yield*/, copyBillingDetailsToCustomer(subscription.default_payment_method)];
            case 12:
                _d.sent();
                _d.label = 13;
            case 13: return [2 /*return*/];
        }
    });
}); };
/**
 * Add invoice objects to Cloud Firestore.
 */
var insertInvoiceRecord = function (invoice) { return __awaiter(void 0, void 0, void 0, function () {
    var customersSnap;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, admin
                    .firestore()
                    .collection(config_1["default"].customersCollectionPath)
                    .where('stripeId', '==', invoice.customer)
                    .get()];
            case 1:
                customersSnap = _a.sent();
                if (customersSnap.size !== 1) {
                    throw new Error('User not found!');
                }
                // Write to invoice to a subcollection on the subscription doc.
                return [4 /*yield*/, customersSnap.docs[0].ref
                        .collection('subscriptions')
                        .doc(invoice.subscription)
                        .collection('invoices')
                        .doc(invoice.id)
                        .set(invoice)];
            case 2:
                // Write to invoice to a subcollection on the subscription doc.
                _a.sent();
                logs.firestoreDocCreated('invoices', invoice.id);
                return [2 /*return*/];
        }
    });
}); };
/**
 * Add PaymentIntent objects to Cloud Firestore for one-time payments.
 */
var insertPaymentRecord = function (payment, checkoutSession) { return __awaiter(void 0, void 0, void 0, function () {
    var customersSnap, lineItems, prices, _i, _a, item;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, admin
                    .firestore()
                    .collection(config_1["default"].customersCollectionPath)
                    .where('stripeId', '==', payment.customer)
                    .get()];
            case 1:
                customersSnap = _b.sent();
                if (customersSnap.size !== 1) {
                    throw new Error('User not found!');
                }
                if (!checkoutSession) return [3 /*break*/, 3];
                return [4 /*yield*/, stripe.checkout.sessions.listLineItems(checkoutSession.id)];
            case 2:
                lineItems = _b.sent();
                prices = [];
                for (_i = 0, _a = lineItems.data; _i < _a.length; _i++) {
                    item = _a[_i];
                    prices.push(admin
                        .firestore()
                        .collection(config_1["default"].productsCollectionPath)
                        .doc(item.price.product)
                        .collection('prices')
                        .doc(item.price.id));
                }
                payment['prices'] = prices;
                payment['items'] = lineItems.data;
                _b.label = 3;
            case 3: 
            // Write to invoice to a subcollection on the subscription doc.
            return [4 /*yield*/, customersSnap.docs[0].ref
                    .collection('payments')
                    .doc(payment.id)
                    .set(payment, { merge: true })];
            case 4:
                // Write to invoice to a subcollection on the subscription doc.
                _b.sent();
                logs.firestoreDocCreated('payments', payment.id);
                return [2 /*return*/];
        }
    });
}); };
/**
 * A webhook handler function for the relevant Stripe events.
 */
exports.handleWebhookEvents = functions.handler.https.onRequest(function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var relevantEvents, event, _a, subscription, checkoutSession, subscriptionId, paymentIntentId, paymentIntent_1, customersSnap, invoice, paymentIntent, error_5;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                relevantEvents = new Set([
                    'product.created',
                    'product.updated',
                    'product.deleted',
                    'price.created',
                    'price.updated',
                    'price.deleted',
                    'checkout.session.completed',
                    'checkout.session.async_payment_succeeded',
                    'checkout.session.async_payment_failed',
                    'customer.subscription.created',
                    'customer.subscription.updated',
                    'customer.subscription.deleted',
                    'tax_rate.created',
                    'tax_rate.updated',
                    'invoice.paid',
                    'invoice.payment_succeeded',
                    'invoice.payment_failed',
                    'invoice.upcoming',
                    'invoice.marked_uncollectible',
                    'invoice.payment_action_required',
                    'payment_intent.processing',
                    'payment_intent.succeeded',
                    'payment_intent.canceled',
                    'payment_intent.payment_failed',
                ]);
                // Instead of getting the `Stripe.Event`
                // object directly from `req.body`,
                // use the Stripe webhooks API to make sure
                // this webhook call came from a trusted source
                try {
                    event = stripe.webhooks.constructEvent(req.rawBody, req.headers['stripe-signature'], config_1["default"].stripeWebhookSecret);
                }
                catch (error) {
                    logs.badWebhookSecret(error);
                    resp.status(401).send('Webhook Error: Invalid Secret');
                    return [2 /*return*/];
                }
                if (!relevantEvents.has(event.type)) return [3 /*break*/, 29];
                logs.startWebhookEventProcessing(event.id, event.type);
                _c.label = 1;
            case 1:
                _c.trys.push([1, 28, , 29]);
                _a = event.type;
                switch (_a) {
                    case 'product.created': return [3 /*break*/, 2];
                    case 'product.updated': return [3 /*break*/, 2];
                    case 'price.created': return [3 /*break*/, 4];
                    case 'price.updated': return [3 /*break*/, 4];
                    case 'product.deleted': return [3 /*break*/, 6];
                    case 'price.deleted': return [3 /*break*/, 8];
                    case 'tax_rate.created': return [3 /*break*/, 10];
                    case 'tax_rate.updated': return [3 /*break*/, 10];
                    case 'customer.subscription.created': return [3 /*break*/, 12];
                    case 'customer.subscription.updated': return [3 /*break*/, 12];
                    case 'customer.subscription.deleted': return [3 /*break*/, 12];
                    case 'checkout.session.completed': return [3 /*break*/, 14];
                    case 'checkout.session.async_payment_succeeded': return [3 /*break*/, 14];
                    case 'checkout.session.async_payment_failed': return [3 /*break*/, 14];
                    case 'invoice.paid': return [3 /*break*/, 22];
                    case 'invoice.payment_succeeded': return [3 /*break*/, 22];
                    case 'invoice.payment_failed': return [3 /*break*/, 22];
                    case 'invoice.upcoming': return [3 /*break*/, 22];
                    case 'invoice.marked_uncollectible': return [3 /*break*/, 22];
                    case 'invoice.payment_action_required': return [3 /*break*/, 22];
                    case 'payment_intent.processing': return [3 /*break*/, 24];
                    case 'payment_intent.succeeded': return [3 /*break*/, 24];
                    case 'payment_intent.canceled': return [3 /*break*/, 24];
                    case 'payment_intent.payment_failed': return [3 /*break*/, 24];
                }
                return [3 /*break*/, 26];
            case 2: return [4 /*yield*/, createProductRecord(event.data.object)];
            case 3:
                _c.sent();
                return [3 /*break*/, 27];
            case 4: return [4 /*yield*/, insertPriceRecord(event.data.object)];
            case 5:
                _c.sent();
                return [3 /*break*/, 27];
            case 6: return [4 /*yield*/, deleteProductOrPrice(event.data.object)];
            case 7:
                _c.sent();
                return [3 /*break*/, 27];
            case 8: return [4 /*yield*/, deleteProductOrPrice(event.data.object)];
            case 9:
                _c.sent();
                return [3 /*break*/, 27];
            case 10: return [4 /*yield*/, insertTaxRateRecord(event.data.object)];
            case 11:
                _c.sent();
                return [3 /*break*/, 27];
            case 12:
                subscription = event.data.object;
                return [4 /*yield*/, manageSubscriptionStatusChange(subscription.id, subscription.customer, event.type === 'customer.subscription.created')];
            case 13:
                _c.sent();
                return [3 /*break*/, 27];
            case 14:
                checkoutSession = event.data
                    .object;
                if (!(checkoutSession.mode === 'subscription')) return [3 /*break*/, 16];
                subscriptionId = checkoutSession.subscription;
                return [4 /*yield*/, manageSubscriptionStatusChange(subscriptionId, checkoutSession.customer, true)];
            case 15:
                _c.sent();
                return [3 /*break*/, 19];
            case 16:
                paymentIntentId = checkoutSession.payment_intent;
                return [4 /*yield*/, stripe.paymentIntents.retrieve(paymentIntentId)];
            case 17:
                paymentIntent_1 = _c.sent();
                return [4 /*yield*/, insertPaymentRecord(paymentIntent_1, checkoutSession)];
            case 18:
                _c.sent();
                _c.label = 19;
            case 19:
                if (!((_b = checkoutSession.tax_id_collection) === null || _b === void 0 ? void 0 : _b.enabled)) return [3 /*break*/, 21];
                return [4 /*yield*/, admin
                        .firestore()
                        .collection(config_1["default"].customersCollectionPath)
                        .where('stripeId', '==', checkoutSession.customer)
                        .get()];
            case 20:
                customersSnap = _c.sent();
                if (customersSnap.size === 1) {
                    customersSnap.docs[0].ref.set(checkoutSession.customer_details, { merge: true });
                }
                _c.label = 21;
            case 21: return [3 /*break*/, 27];
            case 22:
                invoice = event.data.object;
                return [4 /*yield*/, insertInvoiceRecord(invoice)];
            case 23:
                _c.sent();
                return [3 /*break*/, 27];
            case 24:
                paymentIntent = event.data.object;
                return [4 /*yield*/, insertPaymentRecord(paymentIntent)];
            case 25:
                _c.sent();
                return [3 /*break*/, 27];
            case 26:
                logs.webhookHandlerError(new Error('Unhandled relevant event!'), event.id, event.type);
                _c.label = 27;
            case 27:
                logs.webhookHandlerSucceeded(event.id, event.type);
                return [3 /*break*/, 29];
            case 28:
                error_5 = _c.sent();
                logs.webhookHandlerError(error_5, event.id, event.type);
                resp.json({
                    error: 'Webhook handler failed. View function logs in Firebase.'
                });
                return [2 /*return*/];
            case 29:
                // Return a response to Stripe to acknowledge receipt of the event.
                resp.json({ received: true });
                return [2 /*return*/];
        }
    });
}); });
var deleteProductOrPrice = function (pr) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(pr.object === 'product')) return [3 /*break*/, 2];
                return [4 /*yield*/, admin
                        .firestore()
                        .collection(config_1["default"].productsCollectionPath)
                        .doc(pr.id)["delete"]()];
            case 1:
                _a.sent();
                logs.firestoreDocDeleted(config_1["default"].productsCollectionPath, pr.id);
                _a.label = 2;
            case 2:
                if (!(pr.object === 'price')) return [3 /*break*/, 4];
                return [4 /*yield*/, admin
                        .firestore()
                        .collection(config_1["default"].productsCollectionPath)
                        .doc(pr.product)
                        .collection('prices')
                        .doc(pr.id)["delete"]()];
            case 3:
                _a.sent();
                logs.firestoreDocDeleted('prices', pr.id);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteStripeCustomer = function (_a) {
    var uid = _a.uid, stripeId = _a.stripeId;
    return __awaiter(void 0, void 0, void 0, function () {
        var update_1, subscriptionsSnap, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    // Delete their customer object.
                    // Deleting the customer object will immediately cancel all their active subscriptions.
                    return [4 /*yield*/, stripe.customers.del(stripeId)];
                case 1:
                    // Delete their customer object.
                    // Deleting the customer object will immediately cancel all their active subscriptions.
                    _b.sent();
                    logs.customerDeleted(stripeId);
                    update_1 = {
                        status: 'canceled',
                        ended_at: admin.firestore.Timestamp.now()
                    };
                    return [4 /*yield*/, admin
                            .firestore()
                            .collection(config_1["default"].customersCollectionPath)
                            .doc(uid)
                            .collection('subscriptions')
                            .where('status', 'in', ['trialing', 'active'])
                            .get()];
                case 2:
                    subscriptionsSnap = _b.sent();
                    subscriptionsSnap.forEach(function (doc) {
                        doc.ref.set(update_1, { merge: true });
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _b.sent();
                    logs.customerDeletionError(error_6, uid);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
/*
 * The `onUserDeleted` deletes their customer object in Stripe which immediately cancels all their subscriptions.
 */
exports.onUserDeleted = functions.auth.user().onDelete(function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var customer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!config_1["default"].autoDeleteUsers)
                    return [2 /*return*/];
                return [4 /*yield*/, admin
                        .firestore()
                        .collection(config_1["default"].customersCollectionPath)
                        .doc(user.uid)
                        .get()];
            case 1:
                customer = (_a.sent()).data();
                if (!customer) return [3 /*break*/, 3];
                return [4 /*yield*/, deleteStripeCustomer({ uid: user.uid, stripeId: customer.stripeId })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
/*
 * The `onCustomerDataDeleted` deletes their customer object in Stripe which immediately cancels all their subscriptions.
 */
exports.onCustomerDataDeleted = functions.firestore
    .document("/" + config_1["default"].customersCollectionPath + "/{uid}")
    .onDelete(function (snap, context) { return __awaiter(void 0, void 0, void 0, function () {
    var stripeId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!config_1["default"].autoDeleteUsers)
                    return [2 /*return*/];
                stripeId = snap.data().stripeId;
                return [4 /*yield*/, deleteStripeCustomer({ uid: context.params.uid, stripeId: stripeId })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
