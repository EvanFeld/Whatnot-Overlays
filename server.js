/**
 * NGC State Bridge + Static File Server
 *
 * Two things in one:
 *   1. WebSocket on ws://localhost:3001  — broadcasts state between all OBS browser sources
 *   2. HTTP on http://localhost:3001     — serves the overlay files so index.html works
 *                                          as an OBS Custom Dock with full keyboard input
 *
 * Usage:
 *   npm install ws
 *   node server.js
 *
 * OBS Custom Dock setup (one time):
 *   View → Docks → Custom Browser Docks
 *   Name: NGC Control   |   URL: http://localhost:3001
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');
const { WebSocketServer, WebSocket } = require('ws');

const PORT    = 3001;
const ROOT    = __dirname; // serve files from the nextgen-overlay/ folder

/* ── MIME types ──────────────────────────────────────────────────────────── */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
};

/* ── HTTP: static file server ────────────────────────────────────────────── */
const server = http.createServer((req, res) => {
  /* Default / → index.html */
  let urlPath = req.url.split('?')[0]; // strip query string
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);

  /* Prevent directory traversal outside ROOT */
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`Not found: ${urlPath}`);
      return;
    }
    const ext  = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

/* ── WebSocket: state broadcast ──────────────────────────────────────────── */
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log(`[NGC Bridge] Client connected  (total: ${wss.clients.size})`);

  ws.on('message', (data) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on('close', () => {
    console.log(`[NGC Bridge] Client disconnected (remaining: ${wss.clients.size})`);
  });

  ws.on('error', (err) => {
    console.error('[NGC Bridge] Client error:', err.message);
  });
});

/* ── Start ───────────────────────────────────────────────────────────────── */
server.listen(PORT, () => {
  console.log(`NGC State Bridge  →  ws://localhost:${PORT}`);
  console.log(`NGC Control Panel →  http://localhost:${PORT}`);
  console.log('');
  console.log('OBS Custom Dock: View → Docks → Custom Browser Docks');
  console.log(`  Name: NGC Control   |   URL: http://localhost:${PORT}`);
});
