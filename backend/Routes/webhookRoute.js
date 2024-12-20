const express = require("express");
const { handleWebhook } = require("../Controllers/paymentController");

const webhookRoute = express.Router();

// Webhook route to process Stripe events
webhookRoute.post("/", express.raw({ type: 'application/json' }), handleWebhook);

module.exports = webhookRoute;
