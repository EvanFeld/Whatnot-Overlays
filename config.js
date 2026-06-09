/**
 * config.js — Overlay Suite Configuration
 *
 * Edit this file to brand the overlay suite for your channel.
 * Save, then restart the server (re-run start-overlay) for changes to take effect.
 *
 * ONLY EDIT THE VALUES BELOW — do not change the structure of this file.
 */

window.OVERLAY_CONFIG = {

  // ── Your brand ─────────────────────────────────────────────────────────────
  brandName:   'Your Brand Name',        // Full channel / business name
  brandShort:  'YBN',                    // Short abbreviation (used in small spaces)
  brandSlogan: 'Your slogan goes here.', // Shown on BRB, Starting Soon, and Offline screens

  // ── Accent colors (hex) ────────────────────────────────────────────────────
  // accentColorPrimary   → borders, badges, alerts
  // accentColorSecondary → backgrounds, gradients
  accentColorPrimary:   '#C8102E',       // e.g. '#FF5500'  — use any 6-digit hex color
  accentColorSecondary: '#003087',       // e.g. '#1a1a2e'

  // ── Social handles ─────────────────────────────────────────────────────────
  // Include the @ symbol where it applies. Leave empty string '' to hide.
  socialHandles: {
    twitch:    '@YourHandle',
    instagram: '@YourHandle',
    youtube:   'YourChannel',            // YouTube usually has no @
    tiktok:    '@YourHandle',
    whatnot:   'YourHandle',
  },

  // ── Break defaults ─────────────────────────────────────────────────────────
  // Used as the starting values for each new break.
  defaultBreakType:  'Pick Your Team',  // 'Pick Your Team' | 'Random' | 'Case Break'
  defaultTotalPacks: 24,

  // ── Logo ───────────────────────────────────────────────────────────────────
  // Path from the server root. Place your logo file in assets/logo/ and update
  // this value. Supported formats: .svg, .png, .jpg
  // Recommended size: at least 300px wide, transparent background.
  logoPath: '/assets/logo/placeholder-logo.svg',

};

/* ─────────────────────────────────────────────────────────────────────────────
   Auto-apply: inject brand colors as CSS custom properties so every scene
   and overlay picks them up without any additional code changes.
   ───────────────────────────────────────────────────────────────────────────── */
(function applyCSSVars() {
  const c   = window.OVERLAY_CONFIG;
  const root = document.documentElement;

  /** Convert hex (#RRGGBB) to "r,g,b" parts */
  function hexParts(hex) {
    const h = hex.replace('#', '');
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  }

  function rgba(hex, alpha) {
    const [r, g, b] = hexParts(hex);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function scaleHex(hex, factor) {
    const [r, g, b] = hexParts(hex);
    return `rgb(${Math.min(255, Math.round(r * factor))},${Math.min(255, Math.round(g * factor))},${Math.min(255, Math.round(b * factor))})`;
  }

  const p = c.accentColorPrimary;
  const s = c.accentColorSecondary;

  root.style.setProperty('--color-red',         p);
  root.style.setProperty('--color-red-dim',     scaleHex(p, 0.48));
  root.style.setProperty('--color-red-bright',  scaleHex(p, 1.28));
  root.style.setProperty('--glow-red',
    `0 0 12px ${rgba(p, 0.8)}, 0 0 40px ${rgba(p, 0.4)}`);

  root.style.setProperty('--color-blue',         s);
  root.style.setProperty('--color-blue-dim',     scaleHex(s, 0.35));
  root.style.setProperty('--color-blue-bright',  scaleHex(s, 1.8));
  root.style.setProperty('--glow-blue',
    `0 0 12px ${rgba(s, 0.9)}, 0 0 40px ${rgba(s, 0.5)}`);
})();
