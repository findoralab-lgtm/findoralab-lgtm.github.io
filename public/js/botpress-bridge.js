// botpress-bridge.js
(function () {
  // Базовые настройки по умолчанию
  var defaultConfig = {
    messagingUrl: "https://messaging.botpress.cloud",
    hostUrl: "https://cdn.botpress.cloud/webchat/v3.6",
    showWidget: true
  };

  // Загружаем инициализирующий скрипт Botpress
  function loadBotpressScript(onLoaded) {
    if (document.getElementById('bp-inject-script')) return;

    var s = document.createElement('script');
    s.id = 'bp-inject-script';
    s.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
    s.async = true;
    s.onload = onLoaded;
    document.head.appendChild(s);
  }

  // Ждем, пока botpressWebChat.init станет доступен
  function waitForInit(config) {
    if (window.botpressWebChat && typeof window.botpressWebChat.init === 'function') {
      window.botpressWebChat.init(config);
    } else {
      setTimeout(function () { waitForInit(config); }, 50);
    }
  }

  // Получаем конфигурацию страницы (можно переопределять на странице)
  function getConfig() {
    var pageConfig = window.__bpBridgeConfig || {};
    var cfg = Object.assign({}, defaultConfig, pageConfig);
    if (typeof pageConfig.clientId === 'string' && pageConfig.clientId.length > 0) {
      cfg.clientId = pageConfig.clientId;
    }
    if (!cfg.clientId && typeof window.__bpBridgeClientId === 'string') {
      cfg.clientId = window.__bpBridgeClientId;
    }
    return cfg;
  }

  // Инициализация: загрузка скрипта и запуск init после загрузки
  function initBridge() {
    var cfg = getConfig();
    if (!cfg.clientId) {
      console.warn('Botpress bridge: clientId не задан. Укажите его в window.__bpBridgeConfig.clientId');
    }
    loadBotpressScript(function () {
      waitForInit(cfg);
    });
  }

  // Запуск после загрузки документа
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBridge);
  } else {
    initBridge();
  }

  // Глобальные переменные для конфигурации (пользователь может переопределить на странице)
  window.__bpBridgeConfig = window.__bpBridgeConfig || {};

})();
