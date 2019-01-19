const webpush = require("web-push");
const urlsafeBase64 = require("urlsafe-base64");
const Storage = require("node-storage");

const vapid = require("./vapid.json");

const store = new Storage("./db");
let subscriptions = store.get("subscriptions") || [];

// Create URL sage vapid
module.exports.getKey = () => urlsafeBase64.decode(vapid.publicKey);

module.exports.addSubscription = subscription => {
  // Add to subscriptions array;
  subscriptions.push(subscription);

  // Persist subscriptions
  store.put("subscriptions", subscription);
};
