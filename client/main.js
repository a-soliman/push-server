// Service worker registration object
let swReg;
let serverUrl = "http://localhost:3333";

const subscribe = () => {
  if (!swReg) return console.log("Service Worker Registration Not Found!");

  // Get Application Server Key from push server
  getApplicationServerKey().then(key => {
    swReg.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: key
      })
      .then(res => res.toJSON())
      .then(subscription => {
        // Pass subscription to server
        fetch(`${serverUrl}/subscribe`, {
          method: "POST",
          body: JSON.stringify(subscription)
        })
          .then(setSubscribedStatus)
          .catch(unsubscribe);
      })
      .catch(console.error);
  });
};

const unsubscribe = () => {
  swReg.pushManager.getSubscription().then(subscription => {
    subscription.unsubscribe().then(() => {
      setSubscribedStatus(false);
    });
  });
};

// Get Public key from the server
const getApplicationServerKey = () => {
  return fetch(`${serverUrl}/key`)
    .then(res => res.arrayBuffer())
    .then(key => new Uint8Array(key));
};

// update ui for subscribed status
const setSubscribedStatus = state => {
  if (state) {
    document.getElementById("subscribe").className = "hidden";
    document.getElementById("unsubscribe").className = "";
  } else {
    document.getElementById("subscribe").className = "";
    document.getElementById("unsubscribe").className = "hidden";
  }
};

// Register Service Worker
navigator.serviceWorker
  .register("./sw.js")
  .then(registration => {
    // Reference registraition globally
    swReg = registration;

    // check if a subscribtion exists, and if so , update the  UI
    swReg.pushManager.getSubscription().then(setSubscribedStatus);
  })
  .catch(console.error);

(function addEventListeners() {
  document
    .getElementById("subscribe")
    .querySelector("button")
    .addEventListener("click", subscribe);

  document
    .getElementById("unsubscribe")
    .querySelector("button")
    .addEventListener("click", unsubscribe);
})();
