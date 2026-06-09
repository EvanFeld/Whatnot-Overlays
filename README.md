# New Gen Collections — OBS Overlay Suite

Streaming overlay package for Whatnot phone breaks. All scenes are 1080×1920 portrait.

---

## Running the State Bridge

The WebSocket bridge lets all OBS Browser Sources sync team claims, pack counters, and hit alerts in real time — even across separate browser source instances.

**Setup (one time):**

1. Make sure [Node.js](https://nodejs.org) is installed
2. Open a terminal in the `nextgen-overlay/` folder
3. Run: `npm install ws`

**Every stream:**

1. Open a terminal in the `nextgen-overlay/` folder
2. Run: `node server.js`
3. You should see: `NGC State Bridge running on ws://localhost:3001`
4. Keep this terminal open while streaming

All OBS browser sources will now sync state in real time. If the server is not running, all scenes fall back to localStorage-only sync (works within the same browser window, but not across separate OBS browser sources).

---

## OBS Browser Source Setup

| Scene | Dimensions | Notes |
|---|---|---|
| `scenes/main-break.html` | 1080 × 1920 | Transparent — place over camera |
| `scenes/starting-soon.html` | 1080 × 1920 | Full portrait scene |
| `scenes/brb.html` | 1080 × 1920 | Full portrait scene |
| `scenes/offline.html` | 1080 × 1920 | Full portrait scene |
| `scenes/outro.html` | 1080 × 1920 | Auto-fades to offline after 60s |
| `scenes/team-board.html` | 1920 × 1080 | Desktop tool — use Interact button |
| `scenes/randomizer.html` | Any size | Responsive — portrait or landscape |
| `overlays/hit-alert.html` | Match canvas | Transparent overlay |
| `overlays/hits-board.html` | 300 × 330px | Persistent hits list widget — place anywhere |

## URL Parameters

- `starting-soon.html?countdown=15` — countdown in minutes (default 15)
- `brb.html?countdown=5` — optional BRB countdown in minutes
- `offline.html?nextstream=Friday+7PM+CT` — show next stream time
- `hit-alert.html?trigger=1&player=Mahomes&card=Prizm+Auto&team=kc&value=450` — test alert

## Dev Dashboard

Open `index.html` in a browser to preview all scenes and fire test events.
