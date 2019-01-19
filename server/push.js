const webpush = require("web-push");
const urlsafeBase64 = require("urlsafe-base64");
const vapid = require("./vapid.json");

let subscriptions = [];

// Create URL sage vapid
module.exports.getKey = () => urlsafeBase64.decode(vapid.publicKey);

module.exports.addSubscription = subscription => {
  // Add to subscriptions array;
  subscriptions.push(subscription);
  console.log(subscriptions);
};
