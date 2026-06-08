import { useMemo } from 'react';

/* ── GF(256) arithmetic ── */
const EXP = new Uint8Array(256);
const LOG = new Uint8Array(256);
{
  let v = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = v;
    LOG[v] = i;
    v = (v << 1) ^ (v & 128 ? 0x11d : 0);
  }
  EXP[255] = EXP[0];
}
const gfMul = (a, b) => (a === 0 || b === 0) ? 0 : EXP[(LOG[a] + LOG[b]) % 255];

function rsGenPoly(nsym) {
  let g = [1];
  for (let i = 0; i < nsym; i++) {
    const ng = new Array(g.length + 1).fill(0);
    for (let j = 0; j < g.length; j++) {
      ng[j] ^= g[j];
      ng[j + 1] ^= gfMul(g[j], EXP[i]);
    }
    g = ng;
  }
  return g;
}

function rsEncode(data, nsym) {
  const gen = rsGenPoly(nsym);
  const rem = new Uint8Array(nsym);
  for (let i = 0; i < data.length; i++) {
    const f = data[i] ^ rem[0];
    for (let j = 0; j < nsym - 1; j++) rem[j] = rem[j + 1] ^ gfMul(gen[nsym - 1 - j], f);
    rem[nsym - 1] = gfMul(gen[0], f);
  }
  return rem;
}

/* ── Version 2 (25x25), Medium EC ── */
const SZ = 25;
const TOTAL = 72;
const EC_LEN = 22;
const BLOCKS = 2;

function encodeData(text) {
  const lenB = 16;
  let bits = '0100';
  bits += text.length.toString(2).padStart(lenB, '0');
  for (let i = 0; i < text.length; i++) bits += text.charCodeAt(i).toString(2).padStart(8, '0');
  bits += '0000';
  while (bits.length % 8) bits += '0';
  const pb = ['11101100', '00010001'];
  let pi = 0;
  while (bits.length < TOTAL * 8) { bits += pb[pi]; pi = (pi + 1) % 2; }
  const cw = [];
  for (let i = 0; i < bits.length; i += 8) cw.push(parseInt(bits.slice(i, i + 8), 2));
  return cw;
}

function addEC(data) {
  const sz = data.length / BLOCKS;
  const blocks = [];
  for (let i = 0; i < BLOCKS; i++) blocks.push(data.slice(i * sz, (i + 1) * sz));
  const ecBlocks = blocks.map(b => rsEncode(b, EC_LEN));
  const out = [];
  for (let i = 0; i < sz; i++) for (let b = 0; b < BLOCKS; b++) out.push(blocks[b][i]);
  for (let i = 0; i < EC_LEN; i++) for (let b = 0; b < BLOCKS; b++) out.push(ecBlocks[b][i]);
  return out;
}

/* ── Matrix ── */
function makeMatrix() {
  return Array.from({ length: SZ }, () => new Uint8Array(SZ));
}

function setFn(m) {
  for (let r = 0; r < 8; r++) { m[r][7] = 1; m[7][r] = 1; m[r][SZ - 8] = 1; m[SZ - 8][r] = 1; }
  for (let r = SZ - 7; r < SZ; r++) { m[r][7] = 1; m[7][r] = 1; }
  for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
    const v = r === 0 || r === 6 || c === 0 || c === 6 || (r > 0 && r < 6 && c > 0 && c < 6);
    m[r][c] = v ? 1 : 0;
    m[r][SZ - 7 + c] = v ? 1 : 0;
    m[SZ - 7 + r][c] = v ? 1 : 0;
  }
}

function setSep(m) {
  for (let i = 0; i < 8; i++) { m[7][i] = 0; m[i][7] = 0; m[7][SZ - 1 - i] = 0; m[SZ - 1 - i][7] = 0; }
  m[8][7] = 1;
}

function setAlign(m) {
  const ps = [6, 18];
  for (const r of ps) for (const c of ps) {
    if (m[r][c] === 1) continue;
    for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) {
      const v = Math.max(Math.abs(dr), Math.abs(dc)) !== 1;
      m[r + dr][c + dc] = v ? 1 : 0;
    }
  }
}

function setTime(m) {
  for (let i = 8; i < SZ - 8; i++) { const v = i % 2 === 0 ? 1 : 0; m[6][i] = v; m[i][6] = v; }
}

function setRes(m) {
  for (let r = 0; r < SZ; r++) for (let c = 0; c < SZ; c++) {
    if (m[r][c] !== 0) continue;
    for (const [dr, dc] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < SZ && nc >= 0 && nc < SZ && m[nr][nc] === 1) { m[r][c] = 2; return; }
    }
  }
}

function fmtBits(mask) {
  const data = (0b010 << 10) | (mask << 7) | 0b0000000;
  let rem = data;
  for (let i = 10; i >= 0; i--) rem = (rem >>> 1) ^ ((rem & 1) ? 0x537 : 0);
  return ((data ^ rem) << 8) | 0b101010000010010;
}

function setFmt(m, mask) {
  const bits = fmtBits(mask);
  for (let i = 0; i <= 5; i++) m[8][i] = (bits >> (14 - i)) & 1;
  m[8][6] = (bits >> 8) & 1;
  m[8][7] = (bits >> 7) & 1;
  m[8][8] = (bits >> 6) & 1;
  m[7][8] = (bits >> 5) & 1;
  for (let i = 0; i <= 6; i++) m[5 - i][8] = (bits >> (4 - i)) & 1;
  for (let i = 0; i <= 6; i++) m[SZ - 1 - i][8] = (bits >> (14 - i)) & 1;
  for (let i = 0; i <= 7; i++) m[8][SZ - 8 + i] = (bits >> (7 - i)) & 1;
  m[8][SZ - 8] = 1;
  m[SZ - 8][8] = 1;
}

function placeData(m, cw) {
  let bit = 0;
  for (let right = SZ - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < SZ; vert++) {
      for (let j = 0; j < 2; j++) {
        const col = right - j;
        const up = ((right + 1) & 2) === 0;
        const row = up ? SZ - 1 - vert : vert;
        if (m[row][col] === 0) {
          if (bit < cw.length * 8) m[row][col] = ((cw[bit >> 3] >> (7 - (bit & 7))) & 1) ? 3 : 0;
          bit++;
        }
      }
    }
  }
}

function applyMask(m, fn) {
  for (let r = 0; r < SZ; r++) for (let c = 0; c < SZ; c++) {
    if (m[r][c] === 3) {
      if (fn(r, c)) m[r][c] = m[r][c] === 3 ? 0 : 1;
    }
  }
}

const MASKS = [
  (r, c) => (r + c) % 2 === 0,
  (r, c) => r % 2 === 0,
  (r, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => (r * c) % 2 + (r * c) % 3 === 0,
  (r, c) => ((r * c) % 2 + (r * c) % 3) % 2 === 0,
  (r, c) => ((r + c) % 2 + (r * c) % 3) % 2 === 0,
];

function score(m) {
  let s = 0;
  for (let r = 0; r < SZ; r++) {
    let cnt = 1;
    for (let c = 1; c < SZ; c++) {
      if (m[r][c] === m[r][c - 1] && m[r][c] !== 0 && m[r][c] !== 2) cnt++;
      else { if (cnt >= 5) s += cnt - 2; cnt = 1; }
    }
    if (cnt >= 5) s += cnt - 2;
  }
  for (let c = 0; c < SZ; c++) {
    let cnt = 1;
    for (let r = 1; r < SZ; r++) {
      if (m[r][c] === m[r - 1][c] && m[r][c] !== 0 && m[r][c] !== 2) cnt++;
      else { if (cnt >= 5) s += cnt - 2; cnt = 1; }
    }
    if (cnt >= 5) s += cnt - 2;
  }
  return s;
}

function gen(text) {
  const raw = encodeData(text);
  const all = addEC(raw);
  let bestMask = 0;
  let bestScore = Infinity;
  let bestGrid = null;
  for (let mask = 0; mask < 8; mask++) {
    const m = makeMatrix();
    setFn(m);
    setSep(m);
    setAlign(m);
    setTime(m);
    setRes(m);
    placeData(m, all);
    applyMask(m, MASKS[mask]);
    setFmt(m, mask);
    const sc = score(m);
    if (sc < bestScore) { bestScore = sc; bestMask = mask; bestGrid = m; }
  }
  return bestGrid;
}

/* ── React component ── */
export default function QRCode({ url = 'https://neuro-detect-lite.vercel.app/', size = 160, quiet = 4 }) {
  const grid = useMemo(() => gen(url), [url]);
  const n = SZ + quiet * 2;
  const cell = size / n;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      style={{ display: 'block' }}
      role="img"
      aria-label={`QR code linking to ${url}`}
    >
      <rect width={size} height={size} fill="#fff" />
      {grid.map((row, r) =>
        Array.from(row).map((v, c) => {
          if (v === 0 || v === 2) return null;
          return (
            <rect
              key={`${r}-${c}`}
              x={(c + quiet) * cell}
              y={(r + quiet) * cell}
              width={cell + 0.5}
              height={cell + 0.5}
              fill="#000"
            />
          );
        })
      )}
    </svg>
  );
}
