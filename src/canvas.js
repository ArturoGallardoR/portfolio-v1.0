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

const N = 480;
const R = rng(7);
const pts = Array.from({ length: N }, (_, i) => ({ x: R() * 2 - 1, y: R() * 2 - 1, p: R() * 6.283, s: R() * 2 - 1, q: R(), g: i % 24 === 0 }));
const TAU = Math.PI * 2;
const GATES = [0.14, 0.38, 0.62, 0.86];
const GATE_L = ['LINKEDIN', 'N8N', 'AI', 'ODOO'];
const SQUEEZE = [0.55, 0.55, 0.16, 0.45];
const TURNS = 4;
const MONO = '"basicallyAMono", "JetBrains Mono", monospace';
const win = (v, a, b) => ease(Math.min(1, Math.max(0, (v - a) / (b - a))));
const mix = (a, b, m) => [a[0] + (b[0] - a[0]) * m, a[1] + (b[1] - a[1]) * m, a[2] + (b[2] - a[2]) * m];

// Raw public data: loose, drifting field.
function raw(p, t) {
  const a = t * 0.00022;
  return [p.x * 0.6 + 0.06 * Math.sin(p.y * 2.7 + a + p.p), p.y * 0.4 + 0.06 * Math.cos(p.x * 3.1 - a * 1.3 + p.p), 0];
}
function curve(u, t) {
  return [-0.62 + 1.24 * u, 0.08 * Math.sin(u * TAU * 1.15 + 0.6) + 0.012 * Math.sin(u * 19 - t * 0.0011)];
}
// Each pipeline stage tightens the stream; AI is where the data gets clean.
function spread(u) {
  let s = 0.22;
  GATES.forEach((g, j) => { s *= 1 + (SQUEEZE[j] - 1) * win(u, g - 0.015, g + 0.05); });
  return s;
}
const lane = (i, t) => (i / N + t * 0.000028) % 1;
function flow(p, i, t) {
  const u = lane(i, t);
  const [cx, cy] = curve(u, t);
  const s = spread(u) * 0.5;
  return [cx + (p.q - 0.5) * s, cy + p.s * s * (1 + 0.25 * Math.sin(t * 0.0013 + p.p)), 0];
}
// Four turns = four hours of manual work; flat from above, a helix once tilted.
function helix(k, spin) {
  const th = k * TURNS * TAU - Math.PI / 2 + spin;
  const r = 0.12 + 0.2 * k;
  return [r * Math.cos(th), r * Math.sin(th), (0.5 - k) * 0.9];
}
function ring(k, spin) {
  const th = k * TAU + spin * 3;
  return [0.06 * Math.cos(th), 0.06 * Math.sin(th), 0];
}

export function drawDataViz(c, p, t, hud = []) {
  const [x, w, h, d] = fit(c);
  x.fillStyle = DEEP;
  x.fillRect(0, 0, w, h);
  x.strokeStyle = `rgba(${WHITE},.04)`;
  x.lineWidth = 1;
  for (let k = 1; k < 10; k++) {
    x.beginPath(); x.moveTo(0, (k * h) / 10); x.lineTo(w, (k * h) / 10); x.stroke();
    x.beginPath(); x.moveTo((k * w) / 10, 0); x.lineTo((k * w) / 10, h); x.stroke();
  }

  const wide = w >= 768 * d;
  const S = wide ? Math.min(w * 0.6, h * 1.0) : w * 0.78;
  const shift = win(p, 0.44, 0.6);
  const ox = wide ? w * (0.42 - 0.15 * shift) : w * 0.5;
  const oy = wide ? h * 0.5 : h * (0.46 - 0.12 * shift);
  const tilt = win(p, 0.6, 0.76);
  const cz = win(p, 0.8, 0.93);
  const spin = t * 0.00012 + p * 1.6;
  const phi = tilt * 1.12;
  const psi = tilt * 0.3;
  const cf = Math.cos(phi), sf = Math.sin(phi), cp = Math.cos(psi), sp = Math.sin(psi);
  const proj = ([X, Y, Z]) => {
    const y1 = Y * cf - Z * sf;
    const z1 = Y * sf + Z * cf;
    const x2 = X * cp + z1 * sp;
    const z2 = -X * sp + z1 * cp;
    const k = 2.6 / (2.6 - z2);
    return [ox + x2 * k * S, oy + y1 * k * S, k];
  };
  x.font = `700 ${10 * d}px ${MONO}`;
  x.textBaseline = 'middle';

  // Helix spine: the structure stays behind as a ghost once time collapses.
  const spine = win(p, 0.56, 0.62);
  if (spine > 0) {
    x.strokeStyle = `rgba(${WHITE},${0.14 * spine * (1 - 0.4 * cz)})`;
    x.lineWidth = d;
    x.beginPath();
    for (let i = 0; i < N; i += 2) {
      const [px, py] = proj(helix(i / (N - 1), spin));
      i ? x.lineTo(px, py) : x.moveTo(px, py);
    }
    x.stroke();
  }

  // Pipeline gates.
  const ga = win(p, 0.1, 0.17) * (1 - win(p, 0.42, 0.5));
  const ut = Math.min(1, Math.max(0, (p - 0.16) / 0.26));
  if (ga > 0) {
    x.textAlign = 'center';
    GATES.forEach((g, j) => {
      const [gx, gy] = proj([...curve(g, t), 0]);
      const on = ut >= g;
      x.strokeStyle = `rgba(${on ? GREEN : WHITE},${(on ? 0.45 : 0.2) * ga})`;
      x.setLineDash([2 * d, 4 * d]);
      x.beginPath(); x.moveTo(gx, gy - 0.2 * S); x.lineTo(gx, gy + 0.2 * S); x.stroke();
      x.setLineDash([]);
      x.fillStyle = `rgba(${on ? GREEN : WHITE},${(on ? 1 : 0.6) * ga})`;
      x.fillText(GATE_L[j], gx, gy - 0.2 * S - 14 * d);
      x.fillText(`0${j + 1}`, gx, gy + 0.2 * S + 14 * d);
    });
  }

  // Particles.
  const sz = 2.2 * d;
  for (let i = 0; i < N; i++) {
    const pt = pts[i];
    const k = i / (N - 1);
    const m0 = win(p, 0.06 + pt.q * 0.08, 0.18 + pt.q * 0.08);
    const mh = win(p, 0.44 + k * 0.12, 0.49 + k * 0.12);
    const mc = win(p, 0.8 + (1 - k) * 0.06, 0.87 + (1 - k) * 0.06);
    let P = raw(pt, t);
    if (m0 > 0) P = mix(P, flow(pt, i, t), m0);
    if (mh > 0) P = mix(P, helix(k, spin), mh);
    if (mc > 0) P = mix(P, ring(k, spin), mc);
    const [px, py, depth] = proj(P);
    const clean = win(lane(i, t), 0.6, 0.66) * m0 * (1 - mh);
    const q = sz * depth * (1 - 0.35 * mc);
    if (pt.g || mc > 0.5) {
      x.fillStyle = `rgba(${GREEN},${pt.g ? 1 : 0.9})`;
      x.fillRect(px - q * 0.7, py - q * 0.7, q * 1.4, q * 1.4);
    } else {
      const a = (0.42 + 0.48 * clean) * (1 - 0.35 * mh) + 0.25 * mh * (depth - 0.8);
      x.fillStyle = `rgba(${WHITE},${Math.max(0.12, Math.min(0.95, a))})`;
      x.fillRect(px - q / 2, py - q / 2, q, q);
    }
  }

  // One lead crossing the pipeline, timed.
  if (ga > 0) {
    const [tx, ty] = proj([...curve(ut, t), 0]);
    x.shadowColor = `rgba(${GREEN},.95)`; x.shadowBlur = 16 * d;
    x.fillStyle = `rgba(${GREEN},${ga})`;
    x.fillRect(tx - 5 * d, ty - 5 * d, 10 * d, 10 * d);
    x.shadowBlur = 0;
    x.textAlign = 'left';
    x.fillText(`T+ ${(ut * 8).toFixed(1)} S`, tx + 12 * d, ty - 14 * d);
  }

  // Hour marks on the helix.
  const ha = tilt * (1 - cz);
  if (ha > 0) {
    x.textAlign = 'left';
    x.fillStyle = `rgba(${WHITE},${0.7 * ha})`;
    for (let hr = 1; hr <= TURNS; hr++) {
      const [hx, hy] = proj(helix(hr / TURNS, spin));
      x.fillRect(hx - 2 * d, hy - 2 * d, 4 * d, 4 * d);
      x.fillText(`${hr}H`, hx + 10 * d, hy);
    }
  }

  // Collapsed: four hours become one ring of ~8 seconds.
  if (cz > 0) {
    const [rx, ry, rk] = proj([0, 0, 0]);
    x.shadowColor = `rgba(${GREEN},.9)`; x.shadowBlur = 20 * d;
    x.strokeStyle = `rgba(${GREEN},${0.8 * cz})`;
    x.lineWidth = 1.5 * d;
    x.beginPath(); x.arc(rx, ry, 0.06 * S * rk, 0, TAU); x.stroke();
    x.shadowBlur = 0;
    x.textAlign = 'center';
    x.fillStyle = `rgba(${GREEN},${cz})`;
    x.fillText('~8 S', rx, ry);
    x.fillStyle = `rgba(${WHITE},${0.6 * cz})`;
    x.fillText('4 H → ~8 S  ·  1800×', rx, ry + 0.06 * S * rk + 22 * d);
  }

  // Stage index.
  const stage = p < 0.1 ? 0 : p < 0.44 ? 1 : p < 0.8 ? 2 : 3;
  const hx = (wide ? 54 : 20) * d;
  const hy = h * (wide ? 0.2 : 0.14);
  for (let j = 0; j < 4; j++) {
    x.fillStyle = j === stage ? `rgb(${GREEN})` : `rgba(${WHITE},${j < stage ? 0.6 : 0.2})`;
    x.fillRect(hx + j * 10 * d, hy - 3 * d, 6 * d, 6 * d);
  }
  if (hud[stage]) {
    x.textAlign = 'left';
    x.fillStyle = `rgba(${WHITE},.75)`;
    x.fillText(hud[stage], hx + 48 * d, hy);
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
