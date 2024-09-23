(function () {
  function checkForDevMode() {
    const url = new URL(window.location.href);
    const isDevMode = url.searchParams.get("m") === "dev";

    if (isDevMode) {
      // Instead of using alert(), we'll create a custom notification
      const notification = document.createElement("div");
      notification.textContent = "警告: 現在、開発モードで表示しています。";
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #ffcc00;
        color: #000;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 9999;
        font-family: Arial, sans-serif;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      `;
      document.body.appendChild(notification);

      // Remove the notification after 5 seconds
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 5000);
    }
  }

  // Run the check when the page loads
  checkForDevMode();

  // Use the Navigation API to detect URL changes
  if ("navigation" in window) {
    navigation.addEventListener("navigate", (event) => {
      if (
        event.navigationType === "push" ||
        event.navigationType === "replace"
      ) {
        checkForDevMode();
      }
    });
  } else {
    // Fallback for browsers that don't support the Navigation API
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        checkForDevMode();
      }
    }).observe(document, { subtree: true, childList: true });
  }
})();
