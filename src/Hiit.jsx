import { useEffect, useMemo, useState } from 'react'
import { HIIT_EXERCISES, HIIT_REST, HIIT_WORK, intervalTitle } from './data.js'
import HowTo from './HowTo.jsx'
import { alarm, tick, unlockAudio } from './sound.js'
import { SessionBack } from './Header.jsx'
import { useBackHandler } from './backBus.js'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const READY_SECONDS = 5
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
const WORK_COLOR = '#84982f'
const REST_COLOR = '#3b82f6'

const HIIT_STEPS = HIIT_EXERCISES.map((x) => ({ ...x, work: HIIT_WORK, rest: HIIT_REST }))

// Interval timer used by the built-in HIIT workout and by custom interval workouts (each step has its own work and rest).
export default function HiitSession({ rounds, steps = HIIT_STEPS, title: workoutTitle = 'HIIT', category = 'hiit', onFinish, onBack }) {
  // Timeline of intervals: get-ready, then work/rest pairs (no rest after the very last exercise).
  const timeline = useMemo(() => {
    const named = steps.map((x, i) => ({ ...x, name: intervalTitle(x, i), muscles: x.muscles ?? [] }))
    const items = [{ kind: 'ready', seconds: READY_SECONDS, next: named[0] }]
    for (let r = 0; r < rounds; r++) {
      named.forEach((ex, i) => {
        items.push({ kind: 'work', seconds: ex.work, ex, round: r, n: i + 1 })
        const upcoming = i < named.length - 1 ? named[i + 1] : r < rounds - 1 ? named[0] : null
        if (upcoming && ex.rest > 0) items.push({ kind: 'rest', seconds: ex.rest, next: upcoming, round: r })
      })
    }
    return items
  }, [rounds, steps])

  const [started, setStarted] = useState(false)
  const [startedAt, setStartedAt] = useState(null)
  useBackHandler(onBack, !startedAt)
  const [elapsed, setElapsed] = useState(0)
  const [idx, setIdx] = useState(0)
  const [left, setLeft] = useState(READY_SECONDS)
  const [running, setRunning] = useState(false)
  const [logged, setLogged] = useState([])

  const item = timeline[idx]
  const lastWorkRound = item.round ?? 0

  useEffect(() => {
    if (!startedAt) return
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 500)
    return () => clearInterval(t)
  }, [startedAt])

  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setLeft((l) => l - 1), 1000)
    return () => clearInterval(t)
  }, [running])

  useEffect(() => {
    if (!running) return
    if (left > 0) {
      if (left <= 3) tick()
      return
    }
    alarm()
    const entry = item.kind === 'work' && {
      exercise: item.ex.name, category, tier: 1, muscles: item.ex.muscles,
      unit: 'sec', planned: item.ex.work, actual: item.ex.work, status: 'done',
    }
    const next = entry ? [...logged, entry] : logged
    setLogged(next)
    if (idx === timeline.length - 1) {
      setRunning(false)
      return finish(next)
    }
    setIdx(idx + 1)
    setLeft(timeline[idx + 1].seconds)
  }, [left, running])

  const finish = (sets) => onFinish(sets, startedAt ? Math.floor((Date.now() - startedAt) / 1000) : 0)

  const begin = () => {
    unlockAudio()
    setStarted(true)
    setStartedAt(Date.now())
    setRunning(true)
  }

  const isWork = item.kind === 'work'
  const color = isWork ? WORK_COLOR : REST_COLOR
  const title = isWork ? item.ex.name : item.next.name
  const label = item.kind === 'ready' ? 'Get ready' : isWork ? 'Work' : 'Rest · next'

  return (
    <div className="screen">
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><SessionBack banked={logged.length > 0} onBack={onBack} onFinish={() => finish(logged)} /><div className="setno">Round <b>{lastWorkRound + 1}</b> <span className="muted">/ {rounds}</span></div></div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Badge variant="outline">{!started ? 'Ready' : isWork ? 'Work' : item.kind === 'rest' ? 'Rest' : 'Get ready'}</Badge>
          <span className="timer">{fmt(elapsed)}</span>
        </div>
      </div>

      {!started ? (
        <>
          <div className="slot">{workoutTitle} · {rounds} {rounds === 1 ? 'round' : 'rounds'}</div>
          <div className="card">
            {steps.map((x, i) => (
              <div key={i} style={{ padding: '4px 0', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span>{i + 1}. {intervalTitle(x, i)}</span>
                {category !== 'hiit' && <span className="muted">{x.work}s / {x.rest}s</span>}
              </div>
            ))}
            <div className="muted" style={{ paddingTop: 8 }}>
              {category === 'hiit' ? `${HIIT_WORK}s work · ${HIIT_REST}s rest · ~10 min per round` : `~${Math.ceil((rounds * steps.reduce((a, x) => a + x.work + x.rest, 0) - steps.at(-1).rest) / 60)} min · work / rest per interval`}
            </div>
          </div>
          <Button onClick={begin}>Start Session</Button>
        </>
      ) : (
        <>
          <div className="slot" style={{ flexDirection: 'column', gap: 12, borderColor: color, paddingBottom: 56 }}>
            <span style={{ fontSize: '1.2rem', color }}>{label}{isWork && ` · ${item.n}/${steps.length}`}</span>
            {title}
            <HowTo name={title} />
          </div>
          <div className="hold"><div className="time" style={{ color }}>{fmt(Math.max(left, 0))}</div></div>
          <Button variant="outline" onClick={() => setRunning(!running)}>{running ? 'Pause' : 'Resume'}</Button>
          <Button variant="muted" disabled={logged.length === 0} onClick={() => finish(logged)}>Finish Workout</Button>
        </>
      )}
    </div>
  )
}
