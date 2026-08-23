const panel = document.getElementById('panel');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const openDoor = document.getElementById('openDoor');
const comeInside = document.getElementById('comeInside');
const enterHall = document.getElementById('enterHall');
const progressFill = document.getElementById('progressFill');
const hint = document.getElementById('hint');
const voice = document.getElementById('voice');

const total = 15;
let current = 1;

const hints = {
  1: 'Click “Open the door” to begin ✨',
  2: 'She is waiting for you — click “Come inside” ✨',
  3: 'A little surprise is starting…',
  4: 'Catch them if you can! 🐱🐭',
  5: 'The chase continues…',
  6: 'Something is happening inside the house…',
  7: 'Onam fun is everywhere 🌼',
  8: 'A special compliment for Gowri ❤️',
  9: 'Someone special is arriving…',
  10: 'Mahabali has something to show you…',
  11: 'A special gift from Mahabali 💕',
  12: 'The hall is locked. Click “Enter the hall” ✨',
  13: 'The doors are opening…',
  14: 'Happy Onam, Gowri! 🌸',
  15: 'A little Onam wish, especially for you 💌'
};

function showHotspots() {
  openDoor.style.display = current === 1 ? 'block' : 'none';
  comeInside.style.display = current === 2 ? 'block' : 'none';
  enterHall.style.display = current === 12 ? 'block' : 'none';
}

function updateUI() {
  progressFill.style.width = `${(current / total) * 100}%`;
  hint.textContent = hints[current] || '';
  showHotspots();
  if (current === 14) {
    voice.currentTime = 0;
    voice.play().catch(() => {
      hint.textContent = 'Tap the page once to hear the Onam wish 🎵';
    });
  } else {
    voice.pause();
  }
}

function goTo(n) {
  n = Math.max(1, Math.min(total, n));
  if (n === current) return;
  panel.classList.add('out');
  setTimeout(() => {
    current = n;
    panel.src = `assets/panels/panel-${String(current).padStart(2,'0')}.png`;
    panel.onload = () => panel.classList.remove('out');
    updateUI();
  }, 180);
}

function advance() { if (current < total) goTo(current + 1); }
function retreat() { if (current > 1) goTo(current - 1); }

openDoor.addEventListener('click', () => goTo(2));
comeInside.addEventListener('click', () => goTo(3));
enterHall.addEventListener('click', () => goTo(13));
next.addEventListener('click', advance);
prev.addEventListener('click', retreat);

// Keyboard navigation makes the slideshow easy to test on GitHub Pages.
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') advance();
  if (e.key === 'ArrowLeft') retreat();
});

// Clicking the artwork itself advances only on non-interactive panels.
panel.addEventListener('click', () => {
  if (![1,2,12].includes(current)) advance();
});

updateUI();
