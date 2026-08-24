const ids = ['scene1','intro','scene2','scene3','scene4','scene5','scene6','pookalam','postcard'];
const video = document.getElementById('sc1Video');
const malare = document.getElementById('malare');
const voice = document.getElementById('gowriVoice');
let sc4Timer = null;
let voiceFallback = null;
let sc3ButtonTimer = null;

function show(id) {
  ids.forEach(x => document.getElementById(x).classList.remove('active'));
  document.getElementById(id).classList.add('active');

  if (id === 'scene3') {
    startMalare();
    const btn = document.getElementById('to4');
    btn.classList.remove('visible');
    clearTimeout(sc3ButtonTimer);
    // Show the SC-3 button exactly 5 seconds after Malare starts.
    sc3ButtonTimer = setTimeout(() => {
      if (document.getElementById('scene3').classList.contains('active')) {
        btn.classList.add('visible');
      }
    }, 5000);
  } else {
    stopMalare();
    clearTimeout(sc3ButtonTimer);
  }

  if (id !== 'pookalam') {
    voice.pause();
    voice.currentTime = 0;
  }
}

function startMalare() {
  malare.currentTime = 0;
  malare.volume = 0.42;
  const p = malare.play();
  if (p) p.catch(() => {});
}
function stopMalare() {
  malare.pause();
  malare.currentTime = 0;
}

// SC-1 is the actual anime book-opening video from VideoAI.
video.addEventListener('ended', () => show('intro'));
video.addEventListener('error', () => show('intro'));

// The button on the supplied For Gowri image starts the story.
document.getElementById('startBtn').onclick = () => show('scene2');

// SC-2 -> SC-3. This click is a user gesture, so Malare can start reliably.
document.getElementById('to3').onclick = () => show('scene3');

// SC-3 -> SC-4.
document.getElementById('to4').onclick = () => {
  show('scene4');
  clearTimeout(sc4Timer);
  sc4Timer = setTimeout(() => show('scene5'), 3000);
};

// SC-5 -> SC-6.
document.getElementById('to6').onclick = () => show('scene6');

// SC-6 -> pookalam -> voice -> postcard.
document.getElementById('openDoor').onclick = () => {
  clearTimeout(sc4Timer);
  show('pookalam');
  voice.currentTime = 0;
  voice.volume = 1;
  const p = voice.play();
  if (p) p.catch(() => {});
  clearTimeout(voiceFallback);
  voiceFallback = setTimeout(() => show('postcard'), 15000);
};
voice.addEventListener('ended', () => {
  clearTimeout(voiceFallback);
  show('postcard');
});

// Do not use sc-7. The requested flow intentionally ends VideoAI scenes at sc-6.
window.addEventListener('load', () => {
  video.currentTime = 0;
  const p = video.play();
  if (p) p.catch(() => {});
});
