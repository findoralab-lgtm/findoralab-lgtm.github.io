// bot-loader.js
console.log('bot-loader.js загружен с GitHub Pages');

(function loadBotpress(){
  const config = {
    host: "https://studio.botpress.cloud",
    botId: "4a1e325a-2e1d-4098-a682-c46f8673aa68",
    showWidget: true
  };

  const cdnUrl = "https://cdn.botpress.cloud/webchat/v0/inject.js";

  // Если CDN уже загружен — инициализируем
  if (window.botpressWebChat && window.botpressWebChat.init) {
    try {
      window.botpressWebChat.init(config);
      console.log('botpress: init вызван (скрипт уже присутствует)');
    } catch (e) {
      console.error('botpress: ошибка при init', e);
    }
    return;
  }

  // Динамически подгружаем CDN скрипт
  const s = document.createElement('script');
  s.src = cdnUrl;
  s.async = true;

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
