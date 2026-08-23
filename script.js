const scenes = {
  intro: document.getElementById("intro"),
  door: document.getElementById("doorScene"),
  walk: document.getElementById("walkScene"),
  hall: document.getElementById("hallScene"),
  card: document.getElementById("cardScene")
};

const music = document.getElementById("music");
const voice = document.getElementById("voice");
const entryCaption = document.getElementById("entryCaption");
const shots = [...document.querySelectorAll("#cinematicShots .shot")];
const revealShot = document.getElementById("revealShot");
const reactionShot = document.getElementById("reactionShot");
const cardBtn = document.getElementById("cardBtn");

let timers = [];
const originalMusicVolume = 0.24;

function clearTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

function showScene(scene) {
  Object.values(scenes).forEach(s => s.classList.remove("active"));
  scene.classList.add("active");
  window.scrollTo(0, 0);
}

function tryMusic(volume = originalMusicVolume) {
  music.volume = volume;
  music.play().catch(() => {});
}

function fadeBetween(elements, index) {
  elements.forEach((el, i) => el.classList.toggle("active", i === index));
}

function stopVoice() {
  voice.pause();
  voice.currentTime = 0;
}

function resetExperience() {
  clearTimers();
  stopVoice();
  music.pause();
  music.currentTime = 0;
  music.volume = originalMusicVolume;
  fadeBetween(shots, 0);
  revealShot.classList.add("active");
  reactionShot.classList.remove("active");
  cardBtn.classList.add("hidden");
  entryCaption.textContent = "";
}

function playRealisticEntry() {
  showScene(scenes.walk);
  const captions = [
    "Gowri steps inside…",
    "A warm Onam welcome…",
    "Everyone is getting the Sadya ready…",
    "Then she notices something ahead…",
    "The camera slowly moves closer…"
  ];

  let i = 0;
  fadeBetween(shots, i);
  entryCaption.textContent = captions[i];

  for (let n = 1; n < shots.length; n++) {
    timers.push(setTimeout(() => {
      i = n;
      fadeBetween(shots, i);
      entryCaption.textContent = captions[i];
    }, n * 3000));
  }

  timers.push(setTimeout(() => startPookalamReveal(), shots.length * 3000 + 250));
}

function openPostcard() {
  clearTimers();
  showScene(scenes.card);
}

function startPookalamReveal() {
  clearTimers();
  showScene(scenes.hall);
  revealShot.classList.add("active");
  reactionShot.classList.remove("active");
  cardBtn.classList.add("hidden");

  // The voice begins exactly when the big pookalam reveal settles.
  timers.push(setTimeout(() => {
    voice.currentTime = 0;
    voice.volume = 1;
    music.volume = 0.07;
    voice.play().catch(() => {});

    document.getElementById("revealText").classList.add("show");
  }, 900));

  timers.push(setTimeout(() => {
    revealShot.classList.remove("active");
    reactionShot.classList.add("active");
  }, 5200));

  // Keep an optional manual button available after the reaction.
  timers.push(setTimeout(() => {
    cardBtn.classList.remove("hidden");
  }, 8200));

  // Automatically open the postcard after Vipin's voice finishes.
  // The fallback also protects against browsers that fail to fire `ended`.
  timers.push(setTimeout(openPostcard, Math.max(48000, ((voice.duration || 46.2) + 2) * 1000)));
}

voice.addEventListener("ended", () => {
  if (scenes.hall.classList.contains("active")) {
    openPostcard();
  }
});

document.getElementById("startBtn").addEventListener("click", () => {
  clearTimers();
  tryMusic();
  showScene(scenes.door);
  timers.push(setTimeout(() => playRealisticEntry(), 2800));
});

document.getElementById("cardBtn").addEventListener("click", openPostcard);

document.getElementById("replayBtn").addEventListener("click", () => {
  resetExperience();
  document.getElementById("revealText").classList.remove("show");
  showScene(scenes.intro);
});
