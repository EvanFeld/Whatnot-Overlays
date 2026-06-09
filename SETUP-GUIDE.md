# Overlay Suite — Setup Guide

This guide will get your overlays running in OBS in about 10 minutes.
You do not need to write any code.

---

## What's in the Box

| File / Folder | What it does |
|---|---|
| `config.js` | **Your settings file.** Edit this to add your brand name, logo, colors, and social handles. |
| `start-overlay.bat` | Windows launcher — double-click to start the server. |
| `start-overlay.command` | Mac launcher — double-click to start the server. |
| `scenes/` | Full-screen browser sources you add to OBS scenes. |
| `overlays/` | Transparent overlays and widgets that sit on top of other scenes. |
| `assets/logo/` | Put your logo file here. |
| `server.js` | The local web server. The launchers run this for you — you never touch it directly. |

---

## Step 1 — Install Node.js

Node.js is the engine that runs the server. You only install it once.

1. Open your browser and go to: **https://nodejs.org/en/download**
2. Click **"LTS" (Recommended)** and download the installer for your operating system.
3. Run the installer and click through the defaults (keep everything checked).
4. When it finishes, you are done. You never need to open Node.js directly.

**How to verify it worked:** Open a terminal / Command Prompt and type `node --version`.
You should see a version number like `v20.x.x`.

---

## Step 2 — Edit config.js

Open `config.js` in any text editor (Notepad, TextEdit, VS Code, etc.)
and change the values between the quotes to match your channel.

```js
window.OVERLAY_CONFIG = {

  brandName:   'Your Channel Name',      // ← change this
  brandShort:  'YCN',                    // ← short abbreviation shown in tight spaces
  brandSlogan: 'Your tagline here.',     // ← shown on BRB, Starting Soon, Offline screens

  accentColorPrimary:   '#C8102E',       // ← main accent color  (borders, badges)
  accentColorSecondary: '#003087',       // ← secondary color    (backgrounds)

  socialHandles: {
    twitch:    '@YourHandle',            // ← include the @ sign
    instagram: '@YourHandle',
    youtube:   'YourHandle',             // ← YouTube usually has no @
    tiktok:    '@YourHandle',
    whatnot:   'YourHandle',
  },

  defaultBreakType:  'Pick Your Team',   // shown in the break header
  defaultTotalPacks: 24,                 // default packs per box

  logoPath: '/assets/logo/your-logo.svg', // ← see Step 3
};
```

**Color tip:** Use any hex color picker (like https://htmlcolorcodes.com) to find your
hex code. Colors must start with `#` and be 6 digits, e.g. `#FF5500`.

**Save the file** after making your changes.

---

## Step 3 — Add Your Logo

1. Place your logo file inside the `assets/logo/` folder.
   - Supported formats: `.svg`, `.png`, `.jpg`
   - Recommended: at least **300 px wide**, transparent background (`.svg` or `.png`)
   - Recommended filename: `your-logo.svg` (no spaces)

2. In `config.js`, update the `logoPath` line to match your filename:
   ```js
   logoPath: '/assets/logo/your-logo.svg',
   ```

If you skip this step, the overlays will fall back to showing your `brandName` as text.

---

## Step 4 — Start the Server

### Windows

1. Double-click **`start-overlay.bat`**
2. A black terminal window will open and your browser will launch automatically.
3. You should see the **Overlay Control Dashboard** at `http://localhost:3001`

### Mac

> **First-time only:** Right-click `start-overlay.command` → **Open** → click **Open** in
> the security dialog. After this, you can double-click it normally.
>
> If double-clicking opens a text editor instead of Terminal, right-click the file,
> choose **Open With → Terminal**.

1. Right-click `start-overlay.command` → **Open** (first time only)
2. A Terminal window will open and your browser will launch automatically.
3. You should see the **Overlay Control Dashboard** at `http://localhost:3001`

**Keep the terminal window open the entire time you are streaming.**
Closing it stops the server and your overlays will go blank.

---

## Step 5 — Set Up OBS Browser Sources

In OBS, for each scene you want to use:

1. Click **+** under **Sources** → choose **Browser**
2. Name it (e.g. "Main Break Overlay")
3. Set the **URL** and **dimensions** from the table below
4. Check **"Shutdown source when not visible"** = OFF for overlays
5. For transparent sources: in the browser source properties, check
   **"Allow transparency"** and add this **Custom CSS**:
   ```css
   body { background-color: rgba(0,0,0,0); }
   ```

### Scene URLs & Dimensions

| Scene | URL | Width | Height | Notes |
|---|---|---|---|---|
| Starting Soon | `http://localhost:3001/scenes/starting-soon.html` | 1080 | 1920 | Portrait |
| Main Break | `http://localhost:3001/scenes/main-break.html` | 1080 | 1920 | Portrait · Transparent BG |
| BRB | `http://localhost:3001/scenes/brb.html` | 1080 | 1920 | Portrait |
| Offline | `http://localhost:3001/scenes/offline.html` | 1080 | 1920 | Portrait |
| Outro | `http://localhost:3001/scenes/outro.html` | 1080 | 1920 | Portrait |
| Randomizer | `http://localhost:3001/scenes/randomizer.html` | 1080 | 1920 | Click **Interact** to spin |
| Case Tracker | `http://localhost:3001/scenes/case-tracker.html` | 1920 | 1080 | Landscape |
| Hit Alert | `http://localhost:3001/overlays/hit-alert.html` | 1920 | 1080 | Overlay · Transparent BG |
| Hits Board | `http://localhost:3001/overlays/hits-board.html` | 300 | 330 | Widget · Transparent BG |
| Lower Third | `http://localhost:3001/overlays/lower-third.html` | 1920 | 80 | Overlay · Position at Y=1000 |

**Tip:** Add the URL params below to scenes that support them:

| Scene | Useful URL params | Example |
|---|---|---|
| Starting Soon | `?countdown=15` | `…starting-soon.html?countdown=15` |
| BRB | `?countdown=5` | `…brb.html?countdown=5` |
| Offline | `?nextstream=Friday+7PM+CT` | `…offline.html?nextstream=Friday+7PM+CT` |
| Outro | `?hits=14&teams=32` | `…outro.html?hits=14&teams=32` |

---

## Troubleshooting

### "The server won't start"

- Make sure Node.js is installed (see Step 1). Open Command Prompt / Terminal and run `node --version` to confirm.
- Make sure the terminal window is running from the correct folder. The `start-overlay` launcher handles this automatically.
- If you see an error like `EADDRINUSE: address already in use`, another copy of the server is already running. Close the old terminal window and try again.

### "Overlays show a blank or broken page in OBS"

- Confirm the server is running (the terminal window must be open and showing "Server is RUNNING").
- In OBS browser source settings, click **"Refresh cache of current page"**.
- Check that the URL in OBS is exactly as shown in the table above (no typos).
- Make sure you are using OBS 28 or later (older versions have browser source issues).

### "Overlays are not updating when I change the break state"

- The Dashboard at `http://localhost:3001` must be open (in a browser tab or as an OBS Custom Dock).
- All browser sources must be connected to the same server. Confirm they all use `http://localhost:3001` — not file:// paths.
- Click **"Refresh Previews"** on the Dashboard if a source looks stuck.

### "My logo is not showing"

- Confirm the file is inside the `assets/logo/` folder.
- Confirm the `logoPath` in `config.js` exactly matches the filename, including the extension.
- Make sure there are no spaces in the filename. Use hyphens instead: `my-logo.svg`.
- After changing `config.js`, restart the server (close and re-run `start-overlay`).

### "My config changes are not showing up"

- Always **restart the server** after editing `config.js` (close the terminal and double-click the launcher again).
- In OBS browser sources, right-click each source → **Refresh** after restarting the server.

---

*Need help? Contact the seller who provided this package.*
