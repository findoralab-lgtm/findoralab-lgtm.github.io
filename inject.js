// inject.js
console.log('inject.js загружен с GitHub Pages');

(function loadBotpress(){
  // Замените host и botId на ваши значения
  const config = {
    host: "https://studio.botpress.cloud",
    botId: "ВАШ_BOT_ID_ЗДЕСЬ",
    showWidget: true
  };

  const cdnUrl = "https://cdn.botpress.cloud/webchat/v0/inject.js";

  // Если CDN уже загружен — просто инициализируем
  if (window.botpressWebChat && window.botpressWebChat.init) {
    try {
      window.botpressWebChat.init(config);
      console.log('botpress: init вызван (скрипт уже присутствует)');
    } catch (e) {
      console.error('botpress: ошибка при init', e);
    }
    return;
  }

  // Иначе — динамически подгружаем CDN
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
