// Service worker registration object
let swReg;

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

fetch("http://localhost:3333")
  .then(res => res.text())
  .then(console.log);
