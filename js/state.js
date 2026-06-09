/**
 * File: /js/state.js
 * Description: Break state manager — persists to localStorage so state survives
 *              OBS browser source refreshes. Broadcasts changes via StorageEvent
 *              so multiple open sources (team-board, main-break, etc.) stay in sync.
 *              Optionally connects to a local WebSocket bridge (server.js) so
 *              separate OBS Browser Source instances also sync in real time.
 * Usage: Include after teams.js. Call getState(), setState(patch), resetBreak().
 */

const STATE_KEY = 'ngc_break_state';

/** Default state factory — returns a fresh break state object. */
const _defaultState = () => {
  const cfg = window.OVERLAY_CONFIG || {};
  return {
  breakNumber:   1,
  productName:   '2024 Panini Prizm NFL',
  breakType:     cfg.defaultBreakType  || 'Pick Your Team',
  currentBox:    1,
  totalBoxes:    1,
  currentPack:   1,
  totalPacks:    cfg.defaultTotalPacks || 24,
  teams:         typeof getDefaultTeams === 'function' ? getDefaultTeams() : [],
  recentHits:    [],                 // [{ player, team, cardName, value, timestamp }]
  lastUpdated:   Date.now(),
  };
};

/* ── WebSocket Bridge ─────────────────────────────────────────────────────── */
let _ws = null;
let _applyingRemote = false;

const _initWsBridge = () => {
  if (typeof WebSocket === 'undefined') return;
  try {
    _ws = new WebSocket('ws://localhost:3001');

    _ws.addEventListener('open', () => {
      console.log('[NGC] WebSocket bridge connected');
    });

    _ws.addEventListener('message', (event) => {
      try {
        const remoteState = JSON.parse(event.data);
        _applyingRemote = true;
        localStorage.setItem(STATE_KEY, JSON.stringify(remoteState));
        window.dispatchEvent(new StorageEvent('storage', {
          key:         STATE_KEY,
          newValue:    JSON.stringify(remoteState),
          storageArea: localStorage,
        }));
        _applyingRemote = false;
      } catch { /* ignore malformed messages */ }
    });

    _ws.addEventListener('error', () => {
      console.log('[NGC] Running in localStorage-only mode');
      _ws = null;
    });

    _ws.addEventListener('close', () => {
      _ws = null;
    });
  } catch {
    console.log('[NGC] Running in localStorage-only mode');
  }
};

/**
 * Reads and parses state from localStorage.
 * Falls back to default state if nothing is stored or JSON is corrupt.
 * @returns {object}
 */
const getState = () => {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return _defaultState();
    return JSON.parse(raw);
  } catch {
    return _defaultState();
  }
};

/**
 * Merges patch into current state and persists to localStorage.
 * Triggers a cross-tab StorageEvent so other sources react immediately.
 * Also broadcasts to all other OBS Browser Sources via WebSocket bridge.
 * @param {Partial<object>} patch
 * @returns {object} Updated full state
 */
const setState = (patch) => {
  const current = getState();
  const next = { ...current, ...patch, lastUpdated: Date.now() };
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(next));
    /* Force a storage event in the same tab for same-page listeners */
    window.dispatchEvent(new StorageEvent('storage', {
      key:      STATE_KEY,
      newValue: JSON.stringify(next),
      oldValue: JSON.stringify(current),
      storageArea: localStorage,
    }));
    /* Broadcast to other OBS Browser Sources via WebSocket bridge */
    if (!_applyingRemote && _ws && _ws.readyState === WebSocket.OPEN) {
      _ws.send(JSON.stringify(next));
    }
  } catch (err) {
    console.error('[NGC State] Failed to persist state:', err);
  }
  return next;
};

/**
 * Resets the break to default state, clearing all claimed teams and hits.
 * @returns {object} Fresh default state
 */
const resetBreak = () => {
  const fresh = _defaultState();
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(fresh));
    window.dispatchEvent(new StorageEvent('storage', {
      key:      STATE_KEY,
      newValue: JSON.stringify(fresh),
      storageArea: localStorage,
    }));
    if (!_applyingRemote && _ws && _ws.readyState === WebSocket.OPEN) {
      _ws.send(JSON.stringify(fresh));
    }
  } catch (err) {
    console.error('[NGC State] Failed to reset state:', err);
  }
  return fresh;
};

/**
 * Claims a team for a buyer, updating teams array inside state.
 * @param {string} teamId   - e.g. 'hou'
 * @param {string} username - viewer/buyer name
 */
const claimTeam = (teamId, username) => {
  const state = getState();
  const teams = state.teams.map(t =>
    t.id === teamId ? { ...t, claimed: true, claimedBy: username } : t
  );
  return setState({ teams });
};

/**
 * Releases a claimed team back to available.
 * @param {string} teamId
 */
const releaseTeam = (teamId) => {
  const state = getState();
  const teams = state.teams.map(t =>
    t.id === teamId ? { ...t, claimed: false, claimedBy: null } : t
  );
  return setState({ teams });
};

/**
 * Unclams a team, making it available again. (alias for releaseTeam)
 * @param {string} teamId
 */
const unclaimTeam = (teamId) => releaseTeam(teamId);

/**
 * Adds a hit to the recentHits array (keeps last 10).
 * @param {{ player:string, team:string, cardName:string, value:number|string }} hit
 */
const addHit = (hit) => {
  const state = getState();
  const recentHits = [
    { ...hit, timestamp: Date.now() },
    ...state.recentHits,
  ].slice(0, 10);
  return setState({ recentHits });
};

/**
 * Advances pack counter by 1; wraps to next box if needed.
 */
const nextPack = () => {
  const { currentPack, totalPacks, currentBox, totalBoxes } = getState();
  if (currentPack < totalPacks) {
    return setState({ currentPack: currentPack + 1 });
  } else if (currentBox < totalBoxes) {
    return setState({ currentPack: 1, currentBox: currentBox + 1 });
  }
  return getState(); // break complete
};

/**
 * Registers a listener that fires whenever state changes in any tab.
 * @param {function} callback - receives the new state object
 * @returns {function} Unsubscribe function
 */
const onStateChange = (callback) => {
  const handler = (event) => {
    if (event.key === STATE_KEY && event.newValue) {
      try {
        callback(JSON.parse(event.newValue));
      } catch { /* ignore corrupt events */ }
    }
  };
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
};

/* ── Initialize state if not present ──────────────────────────────────────── */
if (!localStorage.getItem(STATE_KEY)) {
  localStorage.setItem(STATE_KEY, JSON.stringify(_defaultState()));
}

/* ── Connect WebSocket bridge (silently fails if server not running) ──────── */
if (typeof window !== 'undefined') {
  _initWsBridge();
}

/* ── Expose globally ──────────────────────────────────────────────────────── */
window.NGCState = {
  getState,
  setState,
  resetBreak,
  claimTeam,
  releaseTeam,
  unclaimTeam,
  addHit,
  nextPack,
  onStateChange,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.NGCState;
}
