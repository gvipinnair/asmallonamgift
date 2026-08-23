const scenes = Array.from(document.querySelectorAll('.scene'));
const voice = document.getElementById('voice');
let current = 0;

function show(index) {
  if (index < 0 || index >= scenes.length) return;
  scenes.forEach((scene, i) => scene.classList.toggle('active', i === index));
  current = index;
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

function playVoice() {
  if (!voice) return;
  voice.currentTime = 0;
  const promise = voice.play();
  if (promise && typeof promise.catch === 'function') promise.catch(() => {});
}

function bind(id, handler) {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', handler);
}

bind('enterHome', () => show(1));
bind('next1', () => show(2));
bind('next2', () => show(3));
bind('next3', () => show(4));
bind('enterHall', () => {
  show(5);
  window.setTimeout(playVoice, 550);
});
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
