// bot-loader.js
console.log('bot-loader.js загружен с GitHub Pages');

(function loadBotpress(){
  const config = {
    host: "https://studio.botpress.cloud",
    botId: "4a1e325a-2e1d-4098-a682-c46f8673aa68",
    showWidget: true
  };

  const cdnBase = "https://cdn.botpress.cloud/webchat/v0";
  const cssUrl = cdnBase + "/inject.css";
  const jsUrl  = cdnBase + "/inject.js";

  // 1) Явно добавляем CSS с CDN (если ещё нет)
  if (!document.querySelector('link[href="' + cssUrl + '"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    console.log('botpress: вставлен CSS из CDN ->', cssUrl);
  }

  // 2) Если библиотека уже загружена — сразу инициализируем
  if (window.botpressWebChat && window.botpressWebChat.init) {
    try {
      window.botpressWebChat.init(config);
      console.log('botpress: init вызван (скрипт уже присутствует)');
    } catch (e) {
      console.error('botpress: ошибка при init', e);
    }
    return;
  }

  // 3) Динамически подгружаем CDN скрипт
  const s = document.createElement('script');
  s.src = jsUrl;
  s.async = true;
  s.crossOrigin = 'anonymous';
  s.onload = function () {
    console.log('botpress CDN загружен');
    try {
      if (window.botpressWebChat && window.botpressWebChat.init) {
        window.botpressWebChat.init(config);
        console.log('botpress: init после загрузки CDN');
      } else {
        console.warn('botpress: botpressWebChat не найден после загрузки CDN');
      }
    } catch (e) {
      console.error('botpress: ошибка init после загрузки CDN', e);
    }
  };
  s.onerror = function (err) {
    console.error('botpress: не удалось загрузить CDN', err);
  };
  document.head.appendChild(s);
})();
