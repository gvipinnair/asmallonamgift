const scenes = Array.from(document.querySelectorAll('.scene'));
const voice = document.getElementById('voice');
let current = 0;
let timers = [];

function clearTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

function restartSceneAnimations(scene) {
  scene.querySelectorAll('*').forEach((el) => {
    if (!el.classList.contains('dialogue') && !el.classList.contains('cloud')) {
      el.style.animation = 'none';
    }
  });
  void scene.offsetWidth;
  scene.querySelectorAll('*').forEach((el) => {
    if (!el.classList.contains('dialogue') && !el.classList.contains('cloud')) {
      el.style.animation = '';
    }
  });
}

function show(index) {
  if (index < 0 || index >= scenes.length) return;
  clearTimers();
  scenes.forEach((scene, i) => scene.classList.toggle('active', i === index));
  current = index;

  const active = scenes[index];
  void active.offsetWidth;
  active.classList.remove('ready');
  void active.offsetWidth;
  restartSceneAnimations(active);

  if (index === 0) {
    timers.push(setTimeout(() => active.classList.add('ready'), 2450));
  }

  if (index === 3) {
    // Mahabali walks in from the side, pauses, raises his hand, then releases flowers + bangles.
    timers.push(setTimeout(() => active.classList.add('mahabali-action'), 50));
  }

  if (index === 5) {
    timers.push(setTimeout(playVoice, 700));
  }
}

function playVoice() {
  if (!voice) return;
  voice.currentTime = 0;
  const p = voice.play();
  if (p && typeof p.catch === 'function') p.catch(() => {});
}

function bind(id, handler) {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', handler);
}

bind('enterHome', () => show(1));
bind('next1', () => show(2));
bind('next2', () => show(3));
bind('next3', () => show(4));
bind('enterHall', () => show(5));
bind('postcardBtn', () => show(6));
bind('restart', () => {
  if (voice) {
    voice.pause();
    voice.currentTime = 0;
  }
  show(0);
});

if (voice) {
  voice.addEventListener('ended', () => show(6));
}

show(0);
