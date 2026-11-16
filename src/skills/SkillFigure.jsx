import { buildFigure } from '../figures.js'

const SKIN = '#ecd9c4'
const SKIN_FAR = '#9b8f84'
const SHORTS = '#3a3f49'
const SHORTS_FAR = '#2a2e36'
const SHOE = '#f2b705'
const SHOE_FAR = '#a67c0a'
const HAIR = '#2b2118'
const METAL = '#aab0ba'
const METAL_DK = '#6b727d'

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
const dist = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1])

// Tapered capsule between two points with a soft top-lit highlight and a shaded underside.
function Capsule({ a, b, r1, r2, fill, shade = true }) {
  const len = dist(a, b)
  if (len < 0.2) return <circle cx={a[0]} cy={a[1]} r={Math.max(r1, r2)} fill={fill} />
  const nx = -(b[1] - a[1]) / len
  const ny = (b[0] - a[0]) / len
  const pts = [[a[0] + nx * r1, a[1] + ny * r1], [b[0] + nx * r2, b[1] + ny * r2], [b[0] - nx * r2, b[1] - ny * r2], [a[0] - nx * r1, a[1] - ny * r1]]
  const s = ny > 0 ? -1 : 1 // side facing the light (up)
  const edge = (k, o) => [lerp(a, b, k)[0] + nx * s * o * (r1 + (r2 - r1) * k), lerp(a, b, k)[1] + ny * s * o * (r1 + (r2 - r1) * k)]
  const hl0 = edge(0.12, 0.45)
  const hl1 = edge(0.88, 0.45)
  const sh0 = edge(0.1, -0.62)
  const sh1 = edge(0.9, -0.62)
  return (
    <g>
      <polygon points={pts.map((q) => q.join(',')).join(' ')} fill={fill} />
      <circle cx={a[0]} cy={a[1]} r={r1} fill={fill} />
      <circle cx={b[0]} cy={b[1]} r={r2} fill={fill} />
      {shade && (
        <>
          <line x1={sh0[0]} y1={sh0[1]} x2={sh1[0]} y2={sh1[1]} stroke="#000" strokeOpacity=".16" strokeWidth={Math.min(r1, r2) * 0.8} strokeLinecap="round" />
          <line x1={hl0[0]} y1={hl0[1]} x2={hl1[0]} y2={hl1[1]} stroke="#fff" strokeOpacity=".28" strokeWidth={Math.min(r1, r2) * 0.4} strokeLinecap="round" />
        </>
      )}
    </g>
  )
}


// One smooth silhouette for the trunk (hips → waist → chest → shoulders) with a shaded underside.
function Torso({ hip, sh, hpR, shR }) {
  const len = dist(hip, sh) || 1
  const nx = -(sh[1] - hip[1]) / len
  const ny = (sh[0] - hip[0]) / len
  const stations = [[0, hpR], [0.25, hpR * 0.97], [0.5, hpR * 0.84], [0.78, shR], [1, shR * 0.82]].map(([k, r]) => ({ c: lerp(hip, sh, k), r }))
  const side = (sgn) => stations.map(({ c, r }) => [c[0] + nx * r * sgn, c[1] + ny * r * sgn])
  const A = side(1)
  const B = side(-1)
  const smooth = (P) => P.map((q, i) => (i === 0 ? `M${q[0]},${q[1]}` : `L${q[0]},${q[1]}`)).join(' ')
  const outline = `${smooth(A)} L${B.at(-1)[0]},${B.at(-1)[1]} ${B.slice(0, -1).reverse().map((q) => `L${q[0]},${q[1]}`).join(' ')} Z`
  const dark = ny > 0 ? B : A // side facing away from the light
  const mid = stations.map(({ c }) => c)
  const shade = `${smooth(dark)} ${mid.slice().reverse().map((q) => `L${q[0]},${q[1]}`).join(' ')} Z`
  const lit = ny > 0 ? A : B
  return (
    <g>
      <path d={outline} fill={SKIN} stroke={SKIN} strokeWidth=".8" strokeLinejoin="round" />
      <circle cx={hip[0]} cy={hip[1]} r={hpR} fill={SKIN} />
      <circle cx={sh[0]} cy={sh[1]} r={shR * 0.82} fill={SKIN} />
      <path d={shade} fill="#000" opacity=".14" />
      <path d={`M${lit[1][0]},${lit[1][1]} L${lit[3][0]},${lit[3][1]}`} stroke="#fff" strokeOpacity=".3" strokeWidth=".9" strokeLinecap="round" fill="none" />
      <circle cx={hip[0]} cy={hip[1]} r={hpR + 0.4} fill={SHORTS} />
    </g>
  )
}

// Seen from above: wide shoulders, tapered trunk, straight arms and legs. Used for wide-arm / straddle holds.
function TopBody({ fig }) {
  const [shoulders, spine, hips, ...rest] = fig.lines
  const legs = rest.slice(0, 2)
  const arms = rest.slice(2)
  const [sL, sR] = shoulders.pts
  const [sc, hc] = spine.pts
  const [hL, hR] = hips.pts
  const [hx, hy] = fig.head
  const R = fig.headR
  return (
    <>
      <path d={`M${sL[0] - 3},${sL[1] + 2} L${sR[0] + 3},${sR[1] + 2} L${hR[0] + 3},${hR[1] + 3} L${hL[0] - 3},${hL[1] + 3} Z`} fill="#000" opacity=".35" stroke="#000" strokeOpacity=".35" strokeWidth="4" strokeLinejoin="round" />
      {legs.map((l, i) => (
        <g key={i}>
          {l.pts.slice(1).map((q, k) => <Capsule key={k} a={l.pts[k]} b={q} r1={k === 0 ? 3.2 : 2.4} r2={k === 0 ? 2.5 : 1.9} fill={SKIN_FAR} />)}
          <Capsule a={l.pts[0]} b={lerp(l.pts[0], l.pts[1], 0.7)} r1={3.6} r2={3.2} fill={SHORTS} shade={false} />
          <Capsule a={lerp(l.pts.at(-1), l.pts.at(-2), 0.12)} b={l.pts.at(-1)} r1={2.2} r2={2} fill={SHOE} shade={false} />
        </g>
      ))}
      <path d={`M${sL[0] - 2},${sL[1]} L${sR[0] + 2},${sR[1]} L${hR[0] + 1.5},${hR[1]} L${hL[0] - 1.5},${hL[1]} Z`} fill={SKIN} stroke={SKIN} strokeWidth="2" strokeLinejoin="round" />
      <path d={`M${hL[0] - 1.5},${hL[1] - 5} L${hR[0] + 1.5},${hR[1] - 5} L${hR[0] + 1.5},${hR[1]} L${hL[0] - 1.5},${hL[1]} Z`} fill={SHORTS} stroke={SHORTS} strokeWidth="2" strokeLinejoin="round" />
      <line x1={sc[0]} y1={sc[1] + 2} x2={hc[0]} y2={hc[1] - 6} stroke="#000" strokeOpacity=".18" strokeWidth="1.2" strokeLinecap="round" />
      {arms.map((a, i) => (
        <g key={i}>
          {a.pts.slice(1).map((q, k) => <Capsule key={k} a={a.pts[k]} b={q} r1={k === 0 ? 2.6 : 2} r2={k === 0 ? 2.1 : 1.8} fill={SKIN} />)}
          <circle cx={a.pts.at(-1)[0]} cy={a.pts.at(-1)[1]} r="2.3" fill={SKIN} />
        </g>
      ))}
      <Capsule a={[hx, hy + R * 0.8]} b={sc} r1={2} r2={2.4} fill={SKIN} shade={false} />
      <circle cx={hx} cy={hy} r={R} fill={fig.faceUp ? SKIN : HAIR} />
    </>
  )
}

function Shape({ s }) {
  if (s.t === 'rect') {
    return (
      <g>
        <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="1.2" fill="#2b3038" stroke="#454c57" strokeWidth=".5" />
        <rect x={s.x} y={s.y} width={s.w} height="1.2" rx=".6" fill={METAL} opacity=".7" />
      </g>
    )
  }
  if (s.t === 'line') return <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={METAL} strokeWidth="2.6" strokeLinecap="round" />
  if (s.t === 'diamond') return <polygon points={`${s.x},${s.y - s.s} ${s.x + s.s},${s.y} ${s.x},${s.y + s.s} ${s.x - s.s},${s.y}`} fill="none" stroke="var(--yellow)" strokeWidth="1.4" strokeDasharray="2 2" />
  if (s.t === 'chev') return <polyline points={`${s.x - 4},${s.y + 3} ${s.x},${s.y - 2} ${s.x + 4},${s.y + 3}`} fill="none" stroke="var(--yellow)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  return null
}

function Limb({ pts, radii, fill, far, shorts }) {
  const [o, m, e] = pts
  const [r1, r2, r3] = radii
  return (
    <g>
      <Capsule a={o} b={m} r1={r1} r2={r2} fill={fill} />
      <Capsule a={m} b={e} r1={r2 * 0.96} r2={r3} fill={fill} />
      {shorts && <Capsule a={o} b={lerp(o, m, 0.62)} r1={r1 + 0.5} r2={r1 + 0.1} fill={far ? SHORTS_FAR : SHORTS} shade />}
    </g>
  )
}

// Fully drawn athlete: tapered torso with chest/waist/hip, shorts, hands, shoes, neck and a headband.
// Takes a pose object (see figures.js buildFigure).
export function SkillFigure({ pose, fig: prebuilt, label, className = '', fill = false, zoom = false }) {
  const fig = prebuilt ?? buildFigure(pose)
  const [torso, farLeg, farArm, nearLeg, nearArm] = fig.lines
  const front = fig.front
  const [hip, sh] = torso.pts
  const [hx, hy] = fig.head
  const pts = [...fig.lines.flatMap((l) => l.pts), fig.head]
  if (fig.ground != null) pts.push([65, fig.ground + 4])
  if (fig.bar != null) pts.push([65, fig.bar - 3])
  const xs = pts.map((p) => p[0])
  const ys = pts.map((p) => p[1])
  const bw = Math.max(...xs) - Math.min(...xs)
  const bh = Math.max(...ys) - Math.min(...ys)
  const vw = fill ? Math.min(130, Math.max(bw + 50, ((bh + 34) * 130) / 96, 92)) : zoom ? 104 : 130
  const vh = (vw * 96) / 130
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2
  const cy = (Math.max(...ys) + Math.min(...ys)) / 2
  const view = fill || zoom ? `${cx - vw / 2} ${cy - vh / 2} ${vw} ${vh}` : '0 0 130 96'

  const shR = front ? 7 : 5.2
  const hpR = front ? 4.8 : 4.1
  const neck = lerp(sh, [hx, hy], 0.55)
  const ux = (sh[0] - hip[0]) / (dist(hip, sh) || 1)
  const uy = (sh[1] - hip[1]) / (dist(hip, sh) || 1)
  // Hair caps the end of the head pointing away from the body.
  const nxh = -uy
  const nyh = ux

  const legR = [3.3, 2.5, 1.7]
  const armR = [2.3, 1.8, 1.4]
  const foot = (l, far) => {
    const [, , ankle, toe] = l.pts
    if (!toe) return null
    return <Capsule a={ankle} b={toe} r1={1.9} r2={1.5} fill={far ? SHOE_FAR : SHOE} shade={false} />
  }
  const hand = (l, far) => {
    const [, el, w] = l.pts
    const d = dist(el, w) || 1
    const tip = [w[0] + ((w[0] - el[0]) / d) * 2.2, w[1] + ((w[1] - el[1]) / d) * 2.2]
    return <Capsule a={w} b={tip} r1={1.55} r2={1.2} fill={far ? SKIN_FAR : SKIN} shade={false} />
  }

  return (
    <figure className={`m-0 flex flex-col items-center gap-1 ${fill ? 'min-h-0' : ''} ${className}`}>
      <svg viewBox={view} className={`w-full rounded-2xl border border-[var(--line)] ${fill ? 'min-h-0 flex-1' : ''}`} role="img" aria-label={label} style={{ background: 'radial-gradient(ellipse at 50% 30%, #2b313b 0%, #181b21 78%)' }}>
        <defs>
          <linearGradient id="skf-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3d444f" />
            <stop offset="1" stopColor="#242830" />
          </linearGradient>
          <linearGradient id="skf-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d6dae0" />
            <stop offset=".5" stopColor={METAL} />
            <stop offset="1" stopColor={METAL_DK} />
          </linearGradient>
        </defs>
        {fig.wall != null && (
          <g>
            <rect x={fig.wall - 3.4} y="-40" width="3.4" height="140" fill="#323843" />
            <rect x={fig.wall - 0.4} y="-40" width=".6" height="140" fill="#4b5360" />
          </g>
        )}
        {fig.ground != null && (
          <g>
            <ellipse cx={cx} cy={fig.ground + 2.6} rx={vw * 0.3} ry="2.6" fill="#000" opacity=".4" />
            <rect x={cx - vw * 0.5} y={fig.ground + 1.4} width={vw} height="200" fill="url(#skf-floor)" />
            <rect x={cx - vw * 0.5} y={fig.ground + 1.1} width={vw} height=".9" fill="#5b6370" />
          </g>
        )}
        {fig.bar != null && (
          <g>
            <rect x={cx - vw * 0.46} y={fig.bar - 1.6} width={vw * 0.92} height="3.2" rx="1.6" fill="url(#skf-bar)" />
            <rect x={cx - vw * 0.46 - 1.2} y={fig.bar - 3} width="2.4" height="6" rx="1" fill={METAL_DK} />
            <rect x={cx + vw * 0.46 - 1.2} y={fig.bar - 3} width="2.4" height="6" rx="1" fill={METAL_DK} />
          </g>
        )}
        {fig.kind === 'top' && (
          <>
            <rect x="-60" y="-40" width="250" height="180" fill="#20242b" />
            {[-30, 0, 30, 60, 90, 120].map((y) => <line key={y} x1="-60" x2="190" y1={y} y2={y} stroke="#2a2f37" strokeWidth=".5" />)}
            {[-30, 10, 50, 90, 130, 170].map((x) => <line key={x} y1="-40" y2="140" x1={x} x2={x} stroke="#2a2f37" strokeWidth=".5" />)}
          </>
        )}
        {fig.shapes.map((s, i) => <Shape key={i} s={s} />)}

        {fig.kind === 'top' ? <TopBody fig={fig} /> : (
          <>
        <Limb pts={farLeg.pts} radii={legR} fill={SKIN_FAR} far shorts />
        {foot(farLeg, true)}
        <Limb pts={farArm.pts} radii={armR} fill={SKIN_FAR} far />
        {hand(farArm, true)}

        <Capsule a={sh} b={neck} r1={1.9} r2={1.7} fill={SKIN} shade={false} />
        <Torso hip={hip} sh={sh} hpR={hpR} shR={shR} />
        <Limb pts={nearLeg.pts} radii={legR} fill={SKIN} shorts />
        {foot(nearLeg, false)}
        <Limb pts={nearArm.pts} radii={armR} fill={SKIN} />
        {hand(nearArm, false)}

        <g>
          <circle cx={hx} cy={hy} r={fig.headR} fill={SKIN} />
          <path d={`M${hx - nxh * fig.headR},${hy - nyh * fig.headR} A${fig.headR},${fig.headR} 0 0 1 ${hx + nxh * fig.headR},${hy + nyh * fig.headR} Z`} fill={HAIR} />
        </g>
          </>
        )}
      </svg>
      {label && <figcaption className="muted text-xs uppercase tracking-widest">{label}</figcaption>}
    </figure>
  )
}
