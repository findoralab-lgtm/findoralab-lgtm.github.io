// botpress-bridge.js
(function () {
  var defaultConfig = {
    messagingUrl: "https://messaging.botpress.cloud",
    hostUrl: "https://cdn.botpress.cloud/webchat/v3.6",
    showWidget: true
  };

  var scriptId = 'bp-inject-script';

  function loadBotpressScript(onLoaded) {
    if (document.getElementById(scriptId)) {
      onLoaded && onLoaded();
      return;
    }
    var s = document.createElement('script');
    s.id = scriptId;
    s.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
    s.async = true;
    s.onload = onLoaded;
    s.onerror = function (e) {
      console.error('Botpress inject.js load error', e);
    };
    document.head.appendChild(s);
  }

  function waitForInit(config) {
    if (window.botpressWebChat && typeof window.botpressWebChat.init === 'function') {
      window.botpressWebChat.init(config);
    } else {
      setTimeout(function () { waitForInit(config); }, 50);
    }
  }

  function getConfig() {
    var pageConfig = window.__bpBridgeConfig || {};
    var cfg = Object.assign({}, defaultConfig, pageConfig);
    if (typeof pageConfig.clientId === 'string' && pageConfig.clientId.length > 0) {
      cfg.clientId = pageConfig.clientId;
    }
    return cfg;
  }

  function initBridge() {
    var cfg = getConfig();
    if (!cfg.clientId) {
      console.warn('Botpress bridge: clientId не задан. Укажите window.__bpBridgeConfig.clientId');
    }
    loadBotpressScript(function () {
      waitForInit(cfg);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBridge);
  } else {
    initBridge();
  }

  window.__bpBridgeConfig = window.__bpBridgeConfig || {};
})();
