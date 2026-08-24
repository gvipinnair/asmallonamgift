const scenes = [...document.querySelectorAll('.scene')];
const bookVideo = document.getElementById('sc1Video');
const bookTitle = document.getElementById('bookTitle');
const bookStart = document.getElementById('bookStart');
const malare = document.getElementById('malare');
const gowriVoice = document.getElementById('gowriVoice');

const timers = new Set();
const BOOK_GREEN_TIME = 8.5; // The green page is fully open around 8.5s in the supplied video.
let bookPausedAtGreen = false;

function later(fn, ms) {
  const id = setTimeout(() => {
    timers.delete(id);
    fn();
  }, ms);
  timers.add(id);
  return id;
}

function clearTimers() {
  timers.forEach(clearTimeout);
  timers.clear();
}

function stopMalare() {
  malare.pause();
  malare.currentTime = 0;
}

function startMalare() {
  malare.currentTime = 0;
  malare.volume = 0.42;
  const p = malare.play();
  if (p) p.catch(() => {});
}

function resetSceneUI(scene) {
  scene.querySelectorAll('.popup, .corner-btn').forEach(el => el.classList.remove('show'));
}

function showScene(id) {
  clearTimers();
  scenes.forEach(s => {
    s.classList.remove('active');
    resetSceneUI(s);
  });

  const next = document.getElementById(id);
  next.classList.add('active');

  if (id === 'scene2' || id === 'scene4' || id === 'scene5' || id === 'scene6') {
    stopMalare();
    later(() => next.querySelector('.popup')?.classList.add('show'), 3000);
    later(() => next.querySelector('.corner-btn')?.classList.add('show'), 3000);
  }

  if (id === 'scene3') {
    startMalare();
    later(() => next.querySelector('.popup')?.classList.add('show'), 3000);
    later(() => next.querySelector('.corner-btn')?.classList.add('show'), 5000);
  }

  if (id === 'pookalam') {
    stopMalare();
    gowriVoice.currentTime = 0;
    gowriVoice.volume = 1;
    const p = gowriVoice.play();
    if (p) p.catch(() => {});
    gowriVoice.onended = () => showScene('postcard');
    later(() => showScene('postcard'), 15000);
  }

  window.scrollTo(0, 0);
}

function resetBook() {
  clearTimers();
  bookPausedAtGreen = false;
  bookTitle.classList.remove('show');
  bookStart.classList.remove('show');
  bookVideo.pause();
  bookVideo.currentTime = 0;
}

window.addEventListener('load', () => {
  showScene('scene1');
  bookVideo.currentTime = 0;
  const p = bookVideo.play();
  if (p) p.catch(() => {});
});

bookVideo.addEventListener('timeupdate', () => {
  const t = bookVideo.currentTime;

  // At the fully-open green page, pause the actual video and put "For Gowri"
  // directly on the green page. This replaces the old separate intro screen.
  if (t >= BOOK_GREEN_TIME && !bookPausedAtGreen) {
    bookPausedAtGreen = true;
    bookVideo.pause();
    bookTitle.classList.add('show');
    bookStart.classList.add('show');
  }
});

bookVideo.addEventListener('error', () => {
  bookTitle.classList.add('show');
  bookStart.classList.add('show');
});

bookStart.addEventListener('click', () => showScene('scene2'));

document.getElementById('to3').addEventListener('click', () => showScene('scene3'));
document.getElementById('to4').addEventListener('click', () => showScene('scene4'));
document.getElementById('to5').addEventListener('click', () => showScene('scene5'));
document.getElementById('to6').addEventListener('click', () => showScene('scene6'));
document.getElementById('openDoor').addEventListener('click', () => showScene('pookalam'));

document.getElementById('replay').addEventListener('click', () => {
  stopMalare();
  gowriVoice.pause();
  gowriVoice.currentTime = 0;
  resetBook();
  showScene('scene1');
  const p = bookVideo.play();
  if (p) p.catch(() => {});
});
