/**
 * File: /js/animations.js
 * Description: Reusable animation utilities for the New Gen Collections overlay
 *              suite. Provides confetti bursts, particle systems, letter-by-letter
 *              reveals, counter animations, and timing helpers.
 * Usage: Include after theme.css. All functions are exposed on window.NGCAnim.
 */

'use strict';

/* ─── Constants ─────────────────────────────────────────────────────────────── */
const CONFETTI_COLORS = ['#C8102E', '#003087', '#FFFFFF', '#4A9EFF', '#ff1a3e', '#0047cc'];
const PARTICLE_COLORS = ['#C8102E', '#003087', '#FFFFFF', '#4A9EFF'];

/* ─── Timing Helpers ─────────────────────────────────────────────────────────── */

/** Returns a Promise that resolves after `ms` milliseconds. */
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Runs `fn` after `delay` ms. Returns the timeout id.
 * @param {function} fn
 * @param {number} delay
 */
const after = (fn, delay) => setTimeout(fn, delay);

/* ─── Element Helpers ────────────────────────────────────────────────────────── */

/**
 * Animates an element in using a named CSS keyframe class.
 * Removes the class after animation ends to allow re-triggering.
 * @param {HTMLElement} el
 * @param {string} className - CSS class that applies the animation
 * @param {number} duration  - ms, must match CSS animation-duration
 */
const animateIn = (el, className, duration = 600) => {
  el.classList.remove(className);
  void el.offsetWidth; /* force reflow */
  el.classList.add(className);
  return wait(duration);
};

/**
 * Fades an element in over `duration` ms using the Web Animations API.
 * @param {HTMLElement} el
 * @param {number} duration
 * @param {number} delay
 */
const fadeIn = (el, duration = 400, delay = 0) => {
  el.style.opacity = '0';
  return el.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { duration, delay, fill: 'forwards', easing: 'ease-out' }
  ).finished;
};

/**
 * Fades an element out over `duration` ms.
 * @param {HTMLElement} el
 * @param {number} duration
 * @param {number} delay
 */
const fadeOut = (el, duration = 400, delay = 0) => {
  return el.animate(
    [{ opacity: 1 }, { opacity: 0 }],
    { duration, delay, fill: 'forwards', easing: 'ease-in' }
  ).finished;
};

/**
 * Slides an element in from `direction` ('left'|'right'|'top'|'bottom').
 * @param {HTMLElement} el
 * @param {string} direction
 * @param {number} distance - px
 * @param {number} duration - ms
 */
const slideIn = (el, direction = 'right', distance = 100, duration = 500) => {
  const axis = (direction === 'left' || direction === 'right') ? 'X' : 'Y';
  const sign = (direction === 'right' || direction === 'bottom') ? distance : -distance;
  return el.animate(
    [
      { opacity: 0, transform: `translate${axis}(${sign}px)` },
      { opacity: 1, transform: `translate${axis}(0px)` }
    ],
    { duration, fill: 'forwards', easing: 'cubic-bezier(0.16,1,0.3,1)' }
  ).finished;
};

/* ─── Letter-by-Letter Reveal ────────────────────────────────────────────────── */

/**
 * Wraps each character of `el.textContent` in a <span> and reveals them
 * sequentially with a staggered animation.
 * @param {HTMLElement} el
 * @param {number} staggerMs - delay between each letter
 * @param {number} durationMs - each letter animation duration
 */
const revealLetters = (el, staggerMs = 60, durationMs = 300) => {
  const text = el.textContent;
  el.textContent = '';
  el.setAttribute('aria-label', text);

  const spans = [...text].map((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? ' ' : char;
    span.style.cssText = 'display:inline-block;opacity:0;transform:translateY(30px) scaleY(0.5)';
    el.appendChild(span);
    return span;
  });

  spans.forEach((span, i) => {
    setTimeout(() => {
      span.animate(
        [
          { opacity: 0, transform: 'translateY(30px) scaleY(0.5)' },
          { opacity: 1, transform: 'translateY(0) scaleY(1)' }
        ],
        { duration: durationMs, fill: 'forwards', easing: 'cubic-bezier(0.34,1.56,0.64,1)' }
      );
    }, i * staggerMs);
  });

  return wait(spans.length * staggerMs + durationMs);
};

/* ─── Counter Animation ──────────────────────────────────────────────────────── */

/**
 * Animates a numeric counter from `from` to `to` over `duration` ms.
 * Calls `onUpdate(value)` each frame.
 * @param {number} from
 * @param {number} to
 * @param {number} duration
 * @param {function} onUpdate
 */
const animateCounter = (from, to, duration, onUpdate) => {
  const start = performance.now();
  const diff = to - from;

  const tick = (now) => {
    const elapsed = Math.min(now - start, duration);
    const progress = elapsed / duration;
    const eased = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
    onUpdate(Math.round(from + diff * eased));
    if (elapsed < duration) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

/* ─── Confetti Burst ─────────────────────────────────────────────────────────── */

/**
 * Spawns a burst of confetti pieces from `origin` coordinates.
 * Pieces animate out and remove themselves from DOM.
 * @param {HTMLElement} container - parent to append pieces to
 * @param {{ x: number, y: number }} origin - position in px
 * @param {number} count
 */
const confettiBurst = (container, origin, count = 60) => {
  const o = origin || { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const size  = 6 + Math.random() * 10;
    const angle = Math.random() * 360;
    const speed = 200 + Math.random() * 400;
    const dx    = Math.cos((angle * Math.PI) / 180) * speed;
    const dy    = Math.sin((angle * Math.PI) / 180) * speed - 200;

    piece.style.cssText = `
      position: absolute;
      left: ${o.x}px;
      top:  ${o.y}px;
      width:  ${size}px;
      height: ${size * (Math.random() > 0.5 ? 1 : 2.5)}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events: none;
      z-index: 9999;
      opacity: 1;
    `;
    container.appendChild(piece);

    const delay = Math.random() * 200;
    piece.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${720 + angle}deg)`, opacity: 0 }
      ],
      { duration: 800 + Math.random() * 600, delay, fill: 'forwards', easing: 'ease-out' }
    ).finished.then(() => piece.remove());
  }
};

/* ─── Particle System ────────────────────────────────────────────────────────── */

/**
 * Creates a continuous drifting particle system inside `container`.
 * Returns a stop() function to remove all particles.
 * @param {HTMLElement} container
 * @param {number} count   - number of simultaneous particles
 * @param {'up'|'drift'} mode
 */
const createParticleSystem = (container, count = 40, mode = 'drift') => {
  const particles = [];
  let stopped = false;

  const spawnParticle = () => {
    if (stopped) return;
    const dot = document.createElement('div');
    const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    const size  = 3 + Math.random() * 5;
    const startX = Math.random() * window.innerWidth;
    const duration = 6000 + Math.random() * 8000;
    const driftX = (Math.random() - 0.5) * 120;

    dot.style.cssText = `
      position: absolute;
      left: ${startX}px;
      bottom: -20px;
      width:  ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
    `;
    container.appendChild(dot);
    particles.push(dot);

    dot.animate(
      [
        { transform: `translateX(0px) translateY(0px)`,             opacity: 0   },
        { transform: `translateX(${driftX * 0.1}px) translateY(-108px)`, opacity: 0.8, offset: 0.1 },
        { transform: `translateX(${driftX * 0.8}px) translateY(-864px)`, opacity: 0.5, offset: 0.9 },
        { transform: `translateX(${driftX}px) translateY(-1200px)`, opacity: 0   },
      ],
      { duration, fill: 'forwards', easing: 'linear' }
    ).finished.then(() => {
      dot.remove();
      const idx = particles.indexOf(dot);
      if (idx > -1) particles.splice(idx, 1);
      if (!stopped) setTimeout(spawnParticle, Math.random() * 500);
    });
  };

  for (let i = 0; i < count; i++) {
    setTimeout(spawnParticle, i * (8000 / count));
  }

  return {
    stop: () => {
      stopped = true;
      particles.forEach(p => p.remove());
      particles.length = 0;
    }
  };
};

/* ─── Progress Bar ───────────────────────────────────────────────────────────── */

/**
 * Animates a progress bar element's width to `pct`%.
 * @param {HTMLElement} barEl - the fill element
 * @param {number} pct        - 0–100
 * @param {number} duration   - ms
 */
const animateProgressBar = (barEl, pct, duration = 800) => {
  barEl.animate(
    [{ width: barEl.style.width || '0%' }, { width: `${pct}%` }],
    { duration, fill: 'forwards', easing: 'cubic-bezier(0.16,1,0.3,1)' }
  );
  barEl.style.width = `${pct}%`;
};

/* ─── Sequence Runner ────────────────────────────────────────────────────────── */

/**
 * Runs an array of `{ fn, delay }` steps sequentially.
 * Each step fires `fn` after `delay` ms from the previous step's start.
 * @param {Array<{fn:function, delay:number}>} steps
 */
const runSequence = async (steps) => {
  for (const { fn, delay } of steps) {
    await wait(delay);
    await fn();
  }
};

/* ─── Wheel Easing ───────────────────────────────────────────────────────────── */

/**
 * Returns the total rotation in degrees for a randomizer spin.
 * Ensures the wheel lands on `targetIndex` out of `totalSlices`.
 * @param {number} targetIndex
 * @param {number} totalSlices
 * @param {number} baseRotations - full 360° spins before landing
 * @returns {number} degrees
 */
const calcWheelRotation = (targetIndex, totalSlices, baseRotations = 6) => {
  const sliceDeg = 360 / totalSlices;
  const targetDeg = sliceDeg * targetIndex + sliceDeg / 2;
  /* Pointer is at 0° (right), so we overshoot and land pointer on target */
  return baseRotations * 360 + (360 - targetDeg);
};

/* ─── Expose Globally ────────────────────────────────────────────────────────── */
window.NGCAnim = {
  wait,
  after,
  animateIn,
  fadeIn,
  fadeOut,
  slideIn,
  revealLetters,
  animateCounter,
  confettiBurst,
  createParticleSystem,
  animateProgressBar,
  runSequence,
  calcWheelRotation,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.NGCAnim;
}
