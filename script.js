const scenes = [...document.querySelectorAll(".scene")];

const sc1Video = document.getElementById("sc1Video");
const startExperience = document.getElementById("startExperience");
const bookVideo = document.getElementById("bookVideo");
const bookTitle = document.getElementById("bookTitle");
const bookStart = document.getElementById("bookStart");

const gowriVoice = document.getElementById("gowriVoice");
const gowriVoice2 = document.getElementById("voice2");

const timers = new Set();

// The book has already fully opened onto the green page by ~8.0s
// (checked frame-by-frame); it just sits static after that. Pausing
// any later than this only adds a dead wait before the poster shows up.
const BOOK_GREEN_TIME = 8.0;
// Start blending the poster in while the page is still swinging open,
// so it arrives together with the page instead of after it.
const BOOK_CROSSFADE_START = 7.55;
let bookPausedAtGreen = false;
let voice2Started = false;

function later(fn, ms) {
  const id = setTimeout(() => {
    timers.delete(id);
    fn();
  }, ms);
  timers.add(id);
}

function clearTimers() {
  timers.forEach(clearTimeout);
  timers.clear();
}

function stopAllAudio() {
  gowriVoice.pause();
  gowriVoice2.pause();

  gowriVoice.currentTime = 0;
  gowriVoice2.currentTime = 0;

  gowriVoice.volume = 1;
  gowriVoice2.volume = 1;

  voice2Started = false;
}

/*
 * Voice 1 starts once, when the user clicks "Shall we start?".
 * It continues through SC-2, SC-3, SC-4, SC-5, SC-6 and pookalam.
 * It is NEVER restarted when changing scenes.
 */
function startGowriVoice() {
  if (gowriVoice.ended) return;

  gowriVoice.volume = 1;

  const p = gowriVoice.play();
  if (p) {
    p.catch(err => console.warn("Gowri voice 1 play failed:", err));
  }
}

/*
 * Voice 2 starts ONLY after voice 1 naturally ends.
 */
function startVoice2() {
  if (voice2Started) return;

  voice2Started = true;
  gowriVoice2.pause();
  gowriVoice2.currentTime = 0;
  gowriVoice2.volume = 1;

  const p = gowriVoice2.play();
  if (p) {
    p.catch(err => console.warn("Gowri voice 2 play failed:", err));
  }
}

/*
 * Absolutely no Malare audio is created or played anywhere.
 */
gowriVoice.addEventListener("ended", startVoice2);

gowriVoice2.addEventListener("ended", () => {
  // Voice 1 + Voice 2 repeat continuously.
  voice2Started = false;
  gowriVoice.pause();
  gowriVoice.currentTime = 0;
  gowriVoice.volume = 1;

  // Restart from a fresh media state after the natural end event.
  setTimeout(() => {
    if (document.hidden) return;
    const p = gowriVoice.play();
    if (p) {
      p.catch(() => {
        // A phone may temporarily reject the promise; retry once shortly.
        setTimeout(() => {
          gowriVoice.play().catch(err =>
            console.warn("Gowri voice loop could not restart:", err)
          );
        }, 250);
      });
    }
  }, 40);
});

function resetSceneUI(scene) {
  scene.querySelectorAll(".popup, .corner-btn")
    .forEach(el => el.classList.remove("show"));
}

function showScene(id) {
  clearTimers();

  scenes.forEach(scene => {
    scene.classList.remove("active");
    resetSceneUI(scene);
  });

  const next = document.getElementById(id);
  if (!next) return;

  next.classList.add("active");

  if (id === "scene2") {
    // Voice is already started by the user's button click.
    later(() => next.querySelector(".popup")?.classList.add("show"), 3000);
    later(() => next.querySelector(".corner-btn")?.classList.add("show"), 3000);
  }

  if (id === "scene3") {
    // Keep voice 1 loud and continuous.
    gowriVoice.volume = 1;
    later(() => next.querySelector(".popup")?.classList.add("show"), 3000);
    later(() => next.querySelector(".corner-btn")?.classList.add("show"), 5000);
  }

  if (id === "scene4" || id === "scene5" || id === "scene6") {
    gowriVoice.volume = 1;
    later(() => next.querySelector(".popup")?.classList.add("show"), 3000);
    later(() => next.querySelector(".corner-btn")?.classList.add("show"), 3000);
  }

  if (id === "pookalam") {
    gowriVoice.volume = 1;
    // Do NOT restart Gowri voice here. It continues naturally.
    // Show the postcard 5 seconds after the pookalam appears.
    later(() => showScene("postcard"), 5000);
  }

  window.scrollTo(0, 0);
}

function resetBook() {
  clearTimers();

  bookPausedAtGreen = false;
  bookTitle.classList.remove("show");
  bookTitle.style.opacity = "0";
  bookStart.classList.remove("show");

  bookVideo.pause();
  bookVideo.currentTime = 0;
}

function startBook() {
  showScene("bookScene");

  bookPausedAtGreen = false;
  bookTitle.classList.remove("show");
  bookTitle.style.opacity = "0";
  bookStart.classList.remove("show");

  // Gowri voice starts exactly when the Animated Book starts.
  startGowriVoice();

  bookVideo.currentTime = 0;

  const p = bookVideo.play();
  if (p) p.catch(err => console.warn("Book video play failed:", err));
}

window.addEventListener("load", () => {
  stopAllAudio();
  showScene("scene1");
  sc1Video.currentTime = 0;

  // Try autoplay on laptop/desktop. Mobile browsers may reject autoplay
  // when the video has sound; the visible Start button handles that case.
  const p = sc1Video.play();
  if (p) {
    p.then(() => {
      startExperience?.classList.add("hidden");
    }).catch(() => {
      startExperience?.classList.remove("hidden");
    });
  } else {
    startExperience?.classList.remove("hidden");
  }
});

startExperience?.addEventListener("click", async () => {
  try {
    sc1Video.currentTime = 0;
    await sc1Video.play();
    startExperience.classList.add("hidden");
  } catch (err) {
    console.warn("SC-1 could not start:", err);
  }
});

/* SC-1 finishes -> Animated Book */
sc1Video.addEventListener("play", () => startExperience?.classList.add("hidden"));
sc1Video.addEventListener("ended", startBook);
sc1Video.addEventListener("error", startBook);

/* Animated Book: poster blends in while the page is still opening,
 * and is fully visible exactly when the page settles at BOOK_GREEN_TIME. */
bookVideo.addEventListener("timeupdate", () => {
  if (bookPausedAtGreen) return;

  if (bookVideo.currentTime >= BOOK_CROSSFADE_START) {
    const progress = Math.min(
      1,
      (bookVideo.currentTime - BOOK_CROSSFADE_START) / (BOOK_GREEN_TIME - BOOK_CROSSFADE_START)
    );
    bookTitle.classList.add("show");
    bookTitle.style.opacity = String(progress);
  }

  if (bookVideo.currentTime >= BOOK_GREEN_TIME) {
    bookPausedAtGreen = true;

    bookVideo.currentTime = BOOK_GREEN_TIME;
    bookVideo.pause();

    bookTitle.style.opacity = "1";
    bookStart.classList.add("show");
  }
});

bookVideo.addEventListener("error", () => {
  bookTitle.classList.add("show");
  bookTitle.style.opacity = "1";
  bookStart.classList.add("show");
});

/*
 * IMPORTANT:
 * This is the user gesture that starts Gowri voice.
 * Browser autoplay restrictions therefore allow the audio to start.
 */
bookStart.addEventListener("click", () => {
  showScene("scene2");
});

document.getElementById("to3").addEventListener("click", () => {
  showScene("scene3");
});

document.getElementById("to4").addEventListener("click", () => {
  showScene("scene4");
});

document.getElementById("to5").addEventListener("click", () => {
  showScene("scene5");
});

document.getElementById("to6").addEventListener("click", () => {
  showScene("scene6");
});

document.getElementById("openDoor").addEventListener("click", () => {
  showScene("pookalam");
});

document.getElementById("replay").addEventListener("click", () => {
  stopAllAudio();

  sc1Video.pause();
  sc1Video.currentTime = 0;

  resetBook();

  showScene("scene1");

  const p = sc1Video.play();
  if (p) {
    p.then(() => startExperience?.classList.add("hidden"))
     .catch(() => startExperience?.classList.remove("hidden"));
  }
});
