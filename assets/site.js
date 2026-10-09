'use strict';
const video = document.querySelector('#demo-video');
const player = document.querySelector('.player');
const playButton = document.querySelector('.play-overlay');
const chapters = [...document.querySelectorAll('[data-time]')];
async function playVideo(time) {
  try {
    if (typeof time === 'number') {
      if (video.readyState < 1) {
        video.load();
        await new Promise((resolve, reject) => {
          video.addEventListener('loadedmetadata', resolve, {once: true});
          video.addEventListener('error', reject, {once: true});
        });
      }
      video.currentTime = Math.min(time, video.duration || time);
    }
    await video.play();
  } catch {
    player.classList.remove('playing');
    playButton.querySelector('small').textContent = 'Use player controls or download MP4';
  }
}
playButton.addEventListener('click', () => playVideo());
video.addEventListener('play', () => player.classList.add('playing'));
video.addEventListener('ended', () => player.classList.remove('playing'));
chapters.forEach(button => button.addEventListener('click', () => playVideo(Number(button.dataset.time))));
video.addEventListener('timeupdate', () => {
  chapters.forEach((button, i) => {
    const active = video.currentTime >= Number(button.dataset.time) && (!chapters[i+1] || video.currentTime < Number(chapters[i+1].dataset.time));
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
});
const dialog = document.querySelector('#figure-dialog');
let figureTrigger;
document.querySelectorAll('.figure-zoom').forEach(button => button.addEventListener('click', () => {
  figureTrigger = button;
  const source = button.querySelector('img');
  dialog.querySelector('img').src = source.src;
  dialog.querySelector('img').alt = source.alt;
  dialog.querySelector('p').textContent = button.closest('figure')?.querySelector('figcaption')?.textContent || source.alt;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}));
dialog.querySelector('button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  figureTrigger?.focus({preventScroll:true});
});
const navLinks = [...document.querySelectorAll('.navlinks a')];
const observed = navLinks.map(a => document.querySelector(a.getAttribute('href')));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  });
}, {rootMargin:'-15% 0px -65% 0px'});
observed.forEach(section => observer.observe(section));
