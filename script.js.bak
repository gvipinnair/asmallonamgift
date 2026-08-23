(() => {
  'use strict';

  const scenes = {
    intro: document.getElementById('introScene'),
    door: document.getElementById('doorScene'),
    inside: document.getElementById('insideScene'),
    compliment: document.getElementById('complimentScene'),
    mahabali: document.getElementById('mahabaliScene'),
    hall: document.getElementById('hallDoorScene'),
    reveal: document.getElementById('revealScene'),
    postcard: document.getElementById('postcardScene')
  };

  const voice = document.getElementById('voice');
  const hallDoor = document.getElementById('closedHallDoor');
  const doorLock = document.getElementById('doorLock');
  let current = 'intro';
  let voiceStarted = false;

  function show(name) {
    Object.entries(scenes).forEach(([key, node]) => {
      node.classList.toggle('active', key === name);
    });
    current = name;

    // Reset scene-specific one-shot states whenever a scene is entered.
    if (name === 'door') {
      document.getElementById('comeInside')?.classList.add('hidden');
      window.setTimeout(() => document.getElementById('comeInside')?.classList.remove('hidden'), 2100);
    }

    if (name === 'hall') {
      hallDoor?.classList.remove('opening');
      if (doorLock) doorLock.style.opacity = '1';
    }

    if (name === 'reveal') {
      voiceStarted = false;
      if (voice) {
        try { voice.currentTime = 0; } catch (_) {}
        const p = voice.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
        voiceStarted = true;
      }
    }
  }

  function click(id, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', fn);
  }

  click('enterHome', () => show('door'));
  click('comeInside', () => show('inside'));
  click('continueInside', () => show('compliment'));
  click('continueCompliment', () => show('mahabali'));
  click('readyHall', () => show('hall'));

  click('enterHall', () => {
    // The hall starts locked. User action unlocks it, then both doors open.
    hallDoor?.classList.add('opening');
    window.setTimeout(() => show('reveal'), 1350);
  });

  click('postcardBtn', () => show('postcard'));
  click('restart', () => {
    if (voice) {
      voice.pause();
      try { voice.currentTime = 0; } catch (_) {}
    }
    show('intro');
  });

  if (voice) {
    voice.addEventListener('ended', () => {
      if (current === 'reveal') show('postcard');
    });
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (voice) {
        voice.pause();
        try { voice.currentTime = 0; } catch (_) {}
      }
      show('intro');
    }
  });

  show('intro');
})();
