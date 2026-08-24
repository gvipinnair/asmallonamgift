const scenes = [...document.querySelectorAll('.scene')];
const sc1Video = document.getElementById('sc1Video');
const bookVideo = document.getElementById('bookVideo');
const bookTitle = document.getElementById('bookTitle');
const bookStart = document.getElementById('bookStart');
const malare = document.getElementById('malare');
const gowriVoice = document.getElementById('gowriVoice');

const timers = new Set();
const BOOK_GREEN_TIME = 8.5;
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
  // Malare is the main music during SC-3.
  malare.volume = 0.65;
  const p = malare.play();
  if (p) p.catch(() => {});
}

function startGowriVoice() {
  // Gowri voice starts with SC-2 and continues naturally through the rest of the story.
  if (gowriVoice.paused) {
    const p = gowriVoice.play();
    if (p) p.catch(() => {});
  }
  gowriVoice.volume = 1.0;
}

function stopGowriVoice() {
  gowriVoice.pause();
  gowriVoice.currentTime = 0;
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

  if (id === 'scene2') {
    startGowriVoice();
    stopMalare();
    later(() => next.querySelector('.popup')?.classList.add('show'), 3000);
    later(() => next.querySelector('.corner-btn')?.classList.add('show'), 3000);
  }

  if (id === 'scene3') {
    // Both tracks play together in SC-3: Malare is louder, Gowri voice is underneath.
    startGowriVoice();
    gowriVoice.volume = 0.18;
    startMalare();
    later(() => next.querySelector('.popup')?.classList.add('show'), 3000);
    later(() => next.querySelector('.corner-btn')?.classList.add('show'), 5000);
  }

  if (id === 'scene4' || id === 'scene5' || id === 'scene6') {
    startGowriVoice();
    stopMalare();
    later(() => next.querySelector('.popup')?.classList.add('show'), 3000);
    later(() => next.querySelector('.corner-btn')?.classList.add('show'), 3000);
  }

  if (id === 'pookalam') {
    // Keep Gowri voice playing; do not restart it here.
    stopMalare();
    startGowriVoice();
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

function startBook() {
  showScene('bookScene');
  bookPausedAtGreen = false;
  bookTitle.classList.remove('show');
  bookStart.classList.remove('show');
  bookVideo.currentTime = 0;
  const p = bookVideo.play();
  if (p) p.catch(() => {});
}

window.addEventListener('load', () => {
  showScene('scene1');
  sc1Video.currentTime = 0;
  const p = sc1Video.play();
  if (p) p.catch(() => {});
});

/* SC-1 video finishes -> Animated Book starts */
sc1Video.addEventListener('ended', startBook);
sc1Video.addEventListener('error', startBook);

/* Animated Book pauses on its green page */
bookVideo.addEventListener('timeupdate', () => {
  if (bookVideo.currentTime >= BOOK_GREEN_TIME && !bookPausedAtGreen) {
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
  stopGowriVoice();
  sc1Video.pause();
  sc1Video.currentTime = 0;
  resetBook();
  showScene('scene1');
  const p = sc1Video.play();
  if (p) p.catch(() => {});
});
