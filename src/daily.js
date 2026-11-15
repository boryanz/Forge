import { getDaily, getHistory, saveDaily } from './storage.js'

// Light one-exercise challenges, tagged by the muscle area they hit.
export const CHALLENGES = [
  { key: 'pushups', name: 'Push-ups', amount: 20, unit: 'reps', area: 'push' },
  { key: 'diamond', name: 'Diamond Push-ups', amount: 12, unit: 'reps', area: 'push' },
  { key: 'pike', name: 'Pike Push-ups', amount: 12, unit: 'reps', area: 'push' },
  { key: 'pullups', name: 'Pull-ups', amount: 10, unit: 'reps', area: 'pull' },
  { key: 'chinups', name: 'Chin-ups', amount: 8, unit: 'reps', area: 'pull' },
  { key: 'australian', name: 'Australian Pull-ups', amount: 15, unit: 'reps', area: 'pull' },
  { key: 'squats', name: 'Squats', amount: 30, unit: 'reps', area: 'legsFront' },
  { key: 'lunges', name: 'Split Squats', amount: 20, unit: 'reps', area: 'legsFront' },
  { key: 'wallsit', name: 'Wall Sit', amount: 45, unit: 'sec', area: 'legsFront' },
  { key: 'bridges', name: 'Glute Bridges', amount: 25, unit: 'reps', area: 'legsBack' },
  { key: 'calves', name: 'Calf Raises', amount: 30, unit: 'reps', area: 'legsBack' },
  { key: 'crunches', name: 'Crunches', amount: 20, unit: 'reps', area: 'core' },
  { key: 'plank', name: 'Plank', amount: 60, unit: 'sec', area: 'core' },
  { key: 'legraises', name: 'Leg Raises', amount: 15, unit: 'reps', area: 'core' },
]

// Areas that are fine to train today, given what the last workout hit.
const AFTER = {
  push: ['pull', 'legsFront', 'legsBack', 'core'],
  pull: ['push', 'legsFront', 'legsBack', 'core'],
  combo: ['legsFront', 'legsBack', 'core'],
  pullbar: ['push', 'legsFront', 'legsBack', 'core'],
  legsFront: ['push', 'pull', 'legsBack', 'core'],
  legsBack: ['push', 'pull', 'legsFront', 'core'],
  core: ['push', 'pull', 'legsFront', 'legsBack'],
}

const pad = (n) => String(n).padStart(2, '0')
export const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const shift = (key, days) => {
  const [y, m, d] = key.split('-').map(Number)
  return dayKey(new Date(y, m - 1, d + days))
}

function pickChallenge(yesterdayKey) {
  const last = getHistory().at(-1)
  const areas = AFTER[last?.category]
  const pool = CHALLENGES.filter((c) => (!areas || areas.includes(c.area)) && c.key !== yesterdayKey)
  const list = pool.length ? pool : CHALLENGES
  return list[Math.floor(Math.random() * list.length)]
}

// The pick is stored so it stays the same all day, even after a workout changes what "last trained" is.
export function getTodayChallenge() {
  const daily = getDaily()
  const today = dayKey()
  const stored = CHALLENGES.find((c) => c.key === daily.picks[today])
  if (stored) return stored
  const challenge = pickChallenge(daily.picks[shift(today, -1)])
  const recent = Object.fromEntries(Object.entries(daily.picks).filter(([k]) => k >= shift(today, -7)))
  saveDaily({ ...daily, picks: { ...recent, [today]: challenge.key } })
  return challenge
}

export const isDoneToday = () => getDaily().done.includes(dayKey())

export function completeToday() {
  const daily = getDaily()
  const today = dayKey()
  if (!daily.done.includes(today)) saveDaily({ ...daily, done: [...daily.done, today] })
}

const runEndingAt = (done, key) => {
  let n = 0
  for (let k = key; done.has(k); k = shift(k, -1)) n++
  return n
}

// Streak survives until today ends: it counts back from today if done, otherwise from yesterday.
export function streakInfo(doneList = getDaily().done) {
  const done = new Set(doneList)
  const today = dayKey()
  const doneToday = done.has(today)
  const current = runEndingAt(done, doneToday ? today : shift(today, -1))
  const latest = [...done].sort().at(-1)
  const last = current > 0 || !latest ? current : runEndingAt(done, latest)
  let best = 0
  for (const k of done) if (!done.has(shift(k, -1))) {
    let n = 0
    for (let c = k; done.has(c); c = shift(c, 1)) n++
    best = Math.max(best, n)
  }
  return { current, last, best, doneToday }
}
