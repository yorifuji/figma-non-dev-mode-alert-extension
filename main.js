(function () {
  let isAlertClosed = false;
  let alertElement = null;
  const DEV_MODE_PARAM = "m";
  const DEV_MODE_VALUE = "dev";

  function checkDevMode() {
    const url = new URL(window.location.href);
    const isDevMode = url.searchParams.get(DEV_MODE_PARAM) === DEV_MODE_VALUE;

    if (!isDevMode && !isAlertClosed) {
      showAlert();
    } else if (isDevMode) {
      isAlertClosed = false;
      removeAlert();
    }
  }

  function showAlert() {
    if (isAlertClosed) return;

    try {
      if (!alertElement) {
        alertElement = createAlertElement();
        document.body.appendChild(alertElement);
      }
    } catch (error) {
      console.error("警告の表示中にエラーが発生しました:", error);
    }
  }

  function createAlertElement() {
    const alert = document.createElement("div");
    alert.className = "non-dev-mode-alert";
    alert.innerHTML = `
      <p>警告: 現在、Dev Modeではありません。</p>
      <button class="close-button">非表示</button>
    `;

    const closeButton = alert.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      removeAlert(true);
      console.log("Alert closed by user");
    });

    return alert;
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

  const checkInterval = 1000;
  let lastUrl = window.location.href;

  setInterval(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      console.log("URL changed");
      lastUrl = currentUrl;
      checkDevMode();
    }
  }, checkInterval);

  checkDevMode();
})();
