// проверить доступность /inject.js и вывести его текст
fetch('/inject.js')
  .then(r => {
    console.log('inject.js status:', r.status, r.statusText);
    return r.text();
  })
  .then(text => {
    console.log('--- inject.js content start ---\n' + text + '\n--- inject.js content end ---');
  })
  .catch(err => {
    console.error('fetch /inject.js failed:', err);
  });
