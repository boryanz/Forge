import { useEffect, useState } from 'react'
import Header from './Header.jsx'
import HowTo from './HowTo.jsx'
import { Button } from '@/components/ui/button'
import { alarm, tick, unlockAudio } from './sound.js'
import { completeToday, getTodayChallenge, streakInfo } from './daily.js'
import { Shield } from './DailyShield.jsx'

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export default function Daily({ onBack, onProgress }) {
  const challenge = getTodayChallenge()
  const timed = challenge.unit === 'sec'
  const [done, setDone] = useState(streakInfo().doneToday)
  const [left, setLeft] = useState(challenge.amount)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setLeft((l) => l - 1), 1000)
    return () => clearInterval(t)
  }, [running])

  useEffect(() => {
    if (!running) return
    if (left <= 0) {
      setRunning(false)
      alarm()
    } else if (left <= 3) {
      tick()
    }
  }, [left, running])

  const finish = () => { completeToday(); setDone(true) }
  const timerDone = left <= 0
  const { current } = streakInfo()

  if (done) {
    return (
      <div className="screen">
        <Header title="Daily challenge" onBack={onBack} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <Shield fill={1} size={96} />
          <div className="level-sword-level" style={{ fontSize: '2rem' }}>{current} {current === 1 ? 'day' : 'days'} streak</div>
          <p className="muted" style={{ margin: 0 }}>Challenge complete. Come back tomorrow.</p>
        </div>
        <Button onClick={onProgress}>View progress</Button>
      </div>
    )
  }

  return (
    <div className="screen">
      <Header title="Daily challenge" onBack={onBack} />
      <div className="slot" style={{ paddingBottom: 56 }}>
        {challenge.name}
        <HowTo name={challenge.name} />
      </div>
      <div className="target">{timed ? `Hold for ${challenge.amount}s` : `${challenge.amount} reps`}</div>
      {timed && (
        <div className="hold">
          <div className="time">{fmt(left)}</div>
          <Button variant="outline" onClick={() => {
            unlockAudio()
            if (!running && timerDone) setLeft(challenge.amount)
            setRunning(!running)
          }}>
            {running ? 'Pause' : timerDone ? 'Restart Timer' : left < challenge.amount ? 'Resume' : 'Start Timer'}
          </Button>
        </div>
      )}
      <div style={{ flex: 1 }} />
      <Button variant="bank" size="lg" disabled={timed && !timerDone} onClick={finish}>Done</Button>
    </div>
  )
}
