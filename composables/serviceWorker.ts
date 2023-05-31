export function useServiceWorkerOnUpadte() {
  (window as any).isUpdateAvailable = new Promise(function (resolve, reject) {
    // lazy way of disabling service workers while developing
    if ("serviceWorker" in navigator) {
      // register service worker file
      navigator.serviceWorker.ready
        .then((reg) => {
          reg.onupdatefound = () => {
            const installingWorker = reg.installing as ServiceWorker;
            installingWorker.onstatechange = () => {
              switch (installingWorker.state) {
                case "installed":
                  if (navigator.serviceWorker.controller) {
                    // new update available
                    alert("New update available ! Please reload the app");
                    resolve(true);
                  } else {
                    // no update available
                    resolve(false);
                  }
                  break;
              }
            };
          };
        })
        .catch((err) => console.error("[SW ERROR]", err));
    }
  });
}
