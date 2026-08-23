(() => {
  'use strict';

  const scenes = Object.fromEntries(
    [...document.querySelectorAll('.scene')].map((node) => [node.id.replace('Scene','').replace(/^intro$/,'intro'), node])
  );

  const voice = document.getElementById('voice');
  const hallDoor = document.getElementById('closedHallDoor');
  const doorLock = document.getElementById('doorLock');
  let current = 'intro';

  function show(name) {
    Object.values(scenes).forEach((node) => node.classList.toggle('active', node.id === `${name}Scene`));
    current = name;

    const comeInside = document.getElementById('comeInside');
    if (name === 'door') {
      comeInside?.classList.add('hidden');
      window.setTimeout(() => comeInside?.classList.remove('hidden'), 1500);
    }

    if (name === 'hallDoor') {
      hallDoor?.classList.remove('opening');
      if (doorLock) doorLock.style.opacity = '1';
    }

    if (name === 'reveal') {
      if (voice) {
        voice.pause();
        try { voice.currentTime = 0; } catch (_) {}
        const playPromise = voice.play();
        if (playPromise?.catch) playPromise.catch(() => {});
      }
    }
  }

  function on(id, handler) {
    document.getElementById(id)?.addEventListener('click', handler);
  }

  on('enterHome', () => show('door'));
  on('comeInside', () => show('inside'));
  on('continueInside', () => show('compliment'));
  on('continueCompliment', () => show('mahabali'));
  on('readyHall', () => show('hallDoor'));

  on('enterHall', () => {
    hallDoor?.classList.add('opening');
    window.setTimeout(() => show('reveal'), 1350);
  });

  on('postcardBtn', () => show('postcard'));
  on('restart', () => {
    voice?.pause();
    if (voice) {
      try { voice.currentTime = 0; } catch (_) {}
    }
    hallDoor?.classList.remove('opening');
    show('intro');
  });

  voice?.addEventListener('ended', () => {
    if (current === 'reveal') show('postcard');
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      voice?.pause();
      if (voice) {
        try { voice.currentTime = 0; } catch (_) {}
      }
      show('intro');
    }
  });

  show('intro');
})();
