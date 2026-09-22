const GREEN = '81,224,118';
const WHITE = '247,247,247';
const DEEP = '#11120d';

function fit(c) {
  const r = c.getBoundingClientRect();
  const d = Math.min(devicePixelRatio || 1, 2);
  const w = Math.max(1, Math.round(r.width * d));
  const h = Math.max(1, Math.round(r.height * d));
  if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
  return [c.getContext('2d'), w, h, d];
}

function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

const ease = (x) => x * x * (3 - 2 * x);

export function drawHero(c, t) {
  if (!c) return;
  const [x, w, h] = fit(c);
  x.clearRect(0, 0, w, h);
  const n = 30;
  const s = w / n;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const u = i / n - 0.5;
      const v = j / n - 0.5;
      const f = Math.max(0, 1 - Math.hypot(u, v) * 1.9);
      const val = (Math.sin(i * 0.45 + t * 0.0011) + Math.cos(j * 0.38 - t * 0.0009) + Math.sin((i + j) * 0.21 + t * 0.0007)) / 3;
      const a = f * Math.max(0, val);
      if (a < 0.04) continue;
      const green = (i * 7 + j * 13 + Math.floor(t / 420)) % 83 === 0;
      x.fillStyle = green ? `rgba(${GREEN},${Math.min(1, a * 2.2)})` : `rgba(${WHITE},${a * 0.85})`;
      const q = s * (0.2 + 0.62 * a);
      x.fillRect(i * s + (s - q) / 2, j * s + (s - q) / 2 * (h / w), q, q);
    }
  }
}

const N = 460;
const R = rng(7);
const pts = Array.from({ length: N }, (_, i) => ({ x: R(), y: R(), p: R() * 6.28, g: i % 23 === 0 }));
const bars = Array.from({ length: 24 }, (_, i) => 0.25 + 0.75 * ease(i / 23) * (0.7 + 0.3 * R()));

function cloud(i, t) {
  const p = pts[i];
  return [p.x + 0.015 * Math.sin(t * 0.0005 + p.p), p.y + 0.015 * Math.cos(t * 0.0004 + p.p)];
}
function bar(i) {
  const col = i % 24;
  const k = Math.floor(i / 24);
  return [0.12 + col * (0.76 / 23), 0.86 - (k / 19) * 0.62 * bars[col]];
}
function line(i) {
  const u = i / (N - 1);
  const y = Math.pow(u, 1.6) + 0.045 * Math.sin(u * 22) + 0.02 * Math.sin(u * 61);
  return [0.1 + 0.8 * u, 0.82 - 0.58 * y];
}

export function drawDataViz(c, p, t) {
  const [x, w, h, d] = fit(c);
  x.fillStyle = DEEP;
  x.fillRect(0, 0, w, h);
  x.strokeStyle = `rgba(${WHITE},.05)`;
  x.lineWidth = 1;
  for (let k = 1; k < 10; k++) {
    x.beginPath(); x.moveTo(0, (k * h) / 10); x.lineTo(w, (k * h) / 10); x.stroke();
    x.beginPath(); x.moveTo((k * w) / 10, 0); x.lineTo((k * w) / 10, h); x.stroke();
  }
  const seg = p * 2;
  const pos = (i) => {
    let a, b, m;
    if (seg < 1) { a = cloud(i, t); b = bar(i); m = ease(Math.min(1, Math.max(0, (seg - 0.15) / 0.7))); }
    else { a = bar(i); b = line(i); m = ease(Math.min(1, Math.max(0, (seg - 1.1) / 0.6))); }
    return [(a[0] + (b[0] - a[0]) * m) * w, (a[1] + (b[1] - a[1]) * m) * h];
  };
  if (seg > 1.5) {
    x.strokeStyle = `rgba(${GREEN},${Math.min(0.9, (seg - 1.5) * 2)})`;
    x.lineWidth = 1.5 * d;
    x.beginPath();
    for (let i = 0; i < N; i += 4) { const [px, py] = pos(i); i ? x.lineTo(px, py) : x.moveTo(px, py); }
    x.stroke();
  }
  const sz = 2.5 * d;
  for (let i = 0; i < N; i++) {
    const [px, py] = pos(i);
    if (pts[i].g) {
      x.shadowColor = `rgba(${GREEN},.9)`; x.shadowBlur = 10 * d;
      x.fillStyle = `rgb(${GREEN})`; x.fillRect(px - sz, py - sz, sz * 2, sz * 2);
      x.shadowBlur = 0;
    } else {
      x.fillStyle = `rgba(${WHITE},.7)`; x.fillRect(px - sz / 2, py - sz / 2, sz, sz);
    }
  }
  if (seg > 1.6) {
    const [px, py] = line(N - 1);
    x.shadowColor = `rgba(${GREEN},.92)`; x.shadowBlur = 18 * d;
    x.fillStyle = `rgb(${GREEN})`;
    x.fillRect(px * w - 6 * d, py * h - 6 * d, 12 * d, 12 * d);
    x.shadowBlur = 0;
  }
}

const node = (x, cx, cy, r, green) => {
  x.fillStyle = green ? `rgb(${GREEN})` : DEEP;
  x.strokeStyle = green ? `rgb(${GREEN})` : `rgba(${WHITE},.6)`;
  x.fillRect(cx - r, cy - r, r * 2, r * 2);
  x.strokeRect(cx - r, cy - r, r * 2, r * 2);
};

export function drawCard(c, kind, t) {
  const [x, w, h, d] = fit(c);
  x.fillStyle = DEEP;
  x.fillRect(0, 0, w, h);
  x.lineWidth = d;
  x.font = `700 ${8 * d}px "JetBrains Mono", monospace`;
  x.textAlign = 'center';
  if (kind === 0) {
    const nodes = [[0.5, 0.5], [0.2, 0.25], [0.2, 0.75], [0.8, 0.22], [0.82, 0.78], [0.35, 0.5], [0.66, 0.5]];
    const edges = [[0, 5], [0, 6], [5, 1], [5, 2], [6, 3], [6, 4]];
    x.strokeStyle = `rgba(${WHITE},.25)`;
    edges.forEach(([a, b]) => { x.beginPath(); x.moveTo(nodes[a][0] * w, nodes[a][1] * h); x.lineTo(nodes[b][0] * w, nodes[b][1] * h); x.stroke(); });
    edges.forEach(([a, b], k) => {
      const f = ((t * 0.0006 + k * 0.23) % 1);
      const px = (nodes[b][0] + (nodes[a][0] - nodes[b][0]) * f) * w;
      const py = (nodes[b][1] + (nodes[a][1] - nodes[b][1]) * f) * h;
      x.fillStyle = `rgb(${GREEN})`; x.fillRect(px - 2 * d, py - 2 * d, 4 * d, 4 * d);
    });
    nodes.forEach(([nx, ny], k) => node(x, nx * w, ny * h, (k === 0 ? 9 : 5) * d, k === 0));
    x.fillStyle = `rgba(${WHITE},.7)`;
    x.fillText('ODOO', nodes[0][0] * w, nodes[0][1] * h + 22 * d);
  } else if (kind === 1) {
    const labels = ['LINKEDIN', 'N8N', 'AI', 'ODOO'];
    const y = h * 0.5;
    const xs = labels.map((_, k) => w * (0.14 + k * 0.24));
    x.strokeStyle = `rgba(${WHITE},.25)`;
    x.setLineDash([3 * d, 3 * d]);
    x.beginPath(); x.moveTo(xs[0], y); x.lineTo(xs[3], y); x.stroke();
    x.setLineDash([]);
    const f = (t * 0.00025) % 1;
    const px = xs[0] + (xs[3] - xs[0]) * f;
    labels.forEach((l, k) => {
      node(x, xs[k], y, 8 * d, px >= xs[k] - 2);
      x.fillStyle = `rgba(${WHITE},.7)`;
      x.fillText(l, xs[k], y + 24 * d);
    });
    x.shadowColor = `rgba(${GREEN},.9)`; x.shadowBlur = 10 * d;
    x.fillStyle = `rgb(${GREEN})`; x.fillRect(px - 3 * d, y - 3 * d, 6 * d, 6 * d);
    x.shadowBlur = 0;
    x.fillStyle = `rgb(${GREEN})`;
    x.fillText('~8S', w * 0.5, h * 0.24);
  } else {
    const cols = 20;
    const rows = 5;
    const s = Math.min(w / (cols + 4), h / (rows + 3));
    const ox = (w - cols * s) / 2;
    const oy = (h - rows * s) / 2;
    const tick = Math.floor(t / 180);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const k = i + j * cols;
        const on = (k * 37 + tick * 11) % 29 < 3;
        const q = s * 0.6;
        const cx = ox + i * s + (s - q) / 2;
        const cy = oy + j * s + (s - q) / 2;
        if (on) { x.fillStyle = `rgb(${GREEN})`; x.fillRect(cx, cy, q, q); }
        else { x.strokeStyle = `rgba(${WHITE},${k < 80 ? 0.45 : 0.2})`; x.strokeRect(cx, cy, q, q); }
      }
    }
  }
}

const PR = rng(3);
const pcells = Array.from({ length: 25 }, () => PR());

export function drawPortrait(c, v) {
  if (!c) return;
  const [x, w, h] = fit(c);
  x.clearRect(0, 0, w, h);
  if (v <= 0) return;
  const cw = w / 5;
  const ch = h / 5;
  x.fillStyle = DEEP;
  for (let k = 0; k < 25; k++) {
    if (pcells[k] < v) x.fillRect((k % 5) * cw, Math.floor(k / 5) * ch, cw + 0.5, ch + 0.5);
  }
}

const BR = rng(11);
const band = Array.from({ length: 40 * 30 }, () => BR());

export function drawPixelBand(c, q, visible) {
  if (!c) return;
  const [x, w, h] = fit(c);
  x.clearRect(0, 0, w, h);
  if (!visible || q <= 0 || q >= 1) return;
  const cols = 40;
  const s = w / cols;
  const rows = Math.ceil(h / s);
  const k = Math.sin(Math.PI * q);
  x.fillStyle = `rgb(${WHITE})`;
  for (let j = 0; j < rows; j++) {
    const yy = j / rows;
    const f = k * Math.max(0, 1 - yy * 1.8) * 0.7;
    for (let i = 0; i < cols; i++) {
      if (band[(j * cols + i) % band.length] < f) x.fillRect(i * s, j * s, s + 0.5, s + 0.5);
    }
  }
}
