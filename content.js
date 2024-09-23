// content.js
(function () {
  let isAlertClosed = false;
  let alertElement = null;
  const DEV_MODE_PARAM = "m";
  const DEV_MODE_VALUE = "dev";

  function checkDevMode() {
    const url = new URL(window.location.href);
    const isDevMode = url.searchParams.get(DEV_MODE_PARAM) === DEV_MODE_VALUE;

    if (!isDevMode && !alertElement && !isAlertClosed) {
      showAlert();
    } else if (isDevMode) {
      isAlertClosed = false;
      removeAlert();
    }
  }

  function showAlert() {
    if (!alertElement && !isAlertClosed) {
      try {
        alertElement = document.createElement("div");
        alertElement.className = "non-dev-mode-alert";
        alertElement.innerHTML = `
          <p>警告: 現在、Dev Modeではありません。</p>
          <button class="close-button">非表示</button>
        `;
        document.body.appendChild(alertElement);

        const closeButton = alertElement.querySelector(".close-button");
        closeButton.addEventListener("click", () => {
          removeAlert(true);
          console.log("Alert closed by user");
        });
      } catch (error) {
        console.error("警告の表示中にエラーが発生しました:", error);
      }
    }
  }

  function removeAlert(manualClose = false) {
    if (alertElement && alertElement.parentNode) {
      alertElement.parentNode.removeChild(alertElement);
      alertElement = null;
      console.log("Alert removed");

      if (manualClose) {
        isAlertClosed = true;
      }
    }
  }

  const observer = new MutationObserver((mutations) => {
    let shouldCheck = false;
    for (const mutation of mutations) {
      if (mutation.type === "childList" || mutation.type === "attributes") {
        shouldCheck = true;
        break;
      }
    }
    if (shouldCheck) {
      checkDevMode();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["href"],
  });

  checkDevMode();

  window.addEventListener("popstate", checkDevMode);

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function () {
    originalPushState.apply(this, arguments);
    checkDevMode();
  };

  history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    checkDevMode();
  };

  document.body.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setTimeout(checkDevMode, 0);
    }
  });
})();
