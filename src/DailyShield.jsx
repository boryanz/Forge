import { useEffect, useState } from 'react'
import { getTodayChallenge, streakInfo } from './daily.js'

const SHIELD = 'M32 3 L58 12 V36 C58 52 46 64 32 71 C18 64 6 52 6 36 V12 Z'
const H = 74
const DAYS_PER_SHIELD = 7

export function Shield({ fill, size = 44 }) {
  const [shown, setShown] = useState(0)
  // Start empty on every mount so the fill animation plays when the screen opens.
  useEffect(() => {
    const t = setTimeout(() => setShown(fill), 150)
    return () => clearTimeout(t)
  }, [fill])
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 64 74" aria-hidden="true" style={{ flexShrink: 0 }}>
      <defs>
        <clipPath id="shield-clip"><path d={SHIELD} /></clipPath>
      </defs>
      <g clipPath="url(#shield-clip)">
        <rect x="0" y="0" width="64" height={H} className="level-sword-rise" style={{ fill: 'var(--yellow)', fillOpacity: 0.85, transform: `translateY(${H * (1 - shown)}px)` }} />
      </g>
      <path d={SHIELD} fill="none" style={{ stroke: 'var(--yellow)', strokeWidth: 3, strokeLinejoin: 'round' }} />
    </svg>
  )
}

// Small home card: shield fills across a 7-day cycle of the streak.
export default function DailyShield({ onClick }) {
  const { current, last, doneToday } = streakInfo()
  const fill = current === 0 ? 0 : ((current - 1) % DAYS_PER_SHIELD + 1) / DAYS_PER_SHIELD
  const challenge = getTodayChallenge()
  const sub = doneToday
    ? 'Done for today'
    : `Today: ${challenge.amount}${challenge.unit === 'sec' ? 's' : ''} ${challenge.name}`
  return (
    <button type="button" className="daily-card" onClick={onClick} aria-label={`Daily challenge, ${current} day streak`}>
      <div className="card-art"><Shield fill={fill} size={46} /></div>
      <div style={{ minWidth: 0 }}>
        <div className="daily-streak">{current} <span>{current === 1 ? 'day' : 'days'} streak</span></div>
        <div className="muted daily-sub">{sub}</div>
        {current === 0 && last > 0 && <div className="muted daily-sub">Last streak: {last} {last === 1 ? 'day' : 'days'}</div>}
      </div>
    </button>
  )
}
