import { useEffect, useState } from 'react'
import Header from './Header.jsx'
import { Button } from '@/components/ui/button'
import { SkillFigure } from './skills/SkillFigure.jsx'
import { SKILL_LEVELS } from './skills/skillData.js'
import { alarm, tick, unlockAudio } from './sound.js'

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

// Optional "try it" block: a hold timer with the alarm, or a rep goal. Never blocks the Next button.
function TryIt({ timer, reps }) {
  const [left, setLeft] = useState(timer ?? 0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return undefined
    const t = setInterval(() => setLeft((l) => l - 1), 1000)
    return () => clearInterval(t)
  }, [running])

  useEffect(() => {
    if (!running) return
    if (left <= 0) { setRunning(false); alarm() } else if (left <= 3) tick()
  }, [left, running])

  if (reps) return <div className="card flex items-center justify-between !py-2.5"><span className="label">Try it</span><span className="font-[family-name:var(--display)] text-xl text-[var(--yellow)]">{reps} reps</span></div>
  if (!timer) return null
  const finished = left <= 0
  return (
    <div className="card flex items-center gap-3 !py-2.5">
      <div className="flex flex-1 flex-col">
        <span className="label">Hold {timer}s</span>
        <span className="font-[family-name:var(--display)] text-3xl leading-none text-[var(--yellow)]">{fmt(Math.max(0, left))}</span>
      </div>
      <Button size="sm" className="!px-4 !py-2 !text-sm" onClick={() => { if (finished) setLeft(timer); unlockAudio(); setRunning((r) => !r) }}>{running ? 'Pause' : finished ? 'Again' : 'Start'}</Button>
      <Button size="sm" variant="muted" className="!px-3 !py-2 !text-sm" disabled={left === timer && !running} onClick={() => { setRunning(false); setLeft(timer) }}>Reset</Button>
    </div>
  )
}

// Small highlighted step button that sits beside the progress dots.
function StepButton({ dir, disabled, onClick, label }) {
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-[var(--yellow)] text-[#14110a] transition-[filter,transform] active:scale-95 disabled:cursor-not-allowed disabled:opacity-25">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {dir === 'prev' ? <path d="M15 5l-7 7 7 7" /> : dir === 'done' ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  )
}

// One screen, no scrolling: the figure takes whatever height is left after the text.
function Lesson({ skill, onBack, onDone }) {
  const [i, setI] = useState(0)
  const step = skill.steps[i]
  const last = i === skill.steps.length - 1
  const back = () => (i === 0 ? onBack() : setI(i - 1))

  return (
    <div className="screen lesson !h-dvh !min-h-0 !gap-2.5 overflow-hidden">
      <Header title={skill.name} onBack={back} />
      <div className="flex items-center justify-between gap-3">
        <StepButton dir="prev" label="Previous step" disabled={i === 0} onClick={() => setI(i - 1)} />
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex gap-2">
            {skill.steps.map((_, k) => <span key={k} className="h-2 rounded-full transition-all" style={{ width: k === i ? 20 : 8, background: k <= i ? 'var(--yellow)' : 'var(--line)' }} />)}
          </div>
          <span className="label !text-[0.65rem]">Step {i + 1} of {skill.steps.length}</span>
        </div>
        <StepButton dir={last ? 'done' : 'next'} label={last ? 'Finish' : 'Next step'} onClick={() => (last ? onDone() : setI(i + 1))} />
      </div>
      <div className="flex min-h-0 flex-1 gap-2">
        <SkillFigure fill pose={step.pose} label={step.pose2 ? 'Start' : undefined} className="min-w-0 flex-1" />
        {step.pose2 && <SkillFigure fill pose={step.pose2} label="End" className="min-w-0 flex-1" />}
      </div>
      <h3 className="m-0 text-center font-[family-name:var(--display)] text-xl uppercase tracking-[0.06em] text-[var(--yellow)]">{step.title}</h3>
      <p className="m-0 text-center text-sm leading-snug">{step.text}</p>
      {step.tip && <p className="muted m-0 text-center text-xs leading-snug">Tip: {step.tip}</p>}
      <TryIt key={i} timer={step.timer} reps={step.reps} />
    </div>
  )
}

export default function Skills({ onBack }) {
  const [levelKey, setLevelKey] = useState(null)
  const [skill, setSkill] = useState(null)
  const level = SKILL_LEVELS[levelKey]

  if (skill) return <Lesson skill={skill} onBack={() => setSkill(null)} onDone={() => setSkill(null)} />

  if (level) {
    return (
      <div className="screen">
        <Header title={level.label} onBack={() => setLevelKey(null)} />
        {level.skills.map((s) => (
          <Button key={s.id} variant="secondary" className="cat" style={{ '--c': level.color }} onClick={() => setSkill(s)}>
            {s.name}<div className="muted" style={{ fontSize: '.8rem', textTransform: 'none', fontWeight: 400 }}>{s.blurb}</div>
          </Button>
        ))}
      </div>
    )
  }

  return (
    <div className="screen">
      <Header title="Skills" onBack={onBack} />
      {Object.entries(SKILL_LEVELS).map(([key, l]) => (
        <Button key={key} variant="secondary" className="cat" style={{ '--c': l.color }} onClick={() => setLevelKey(key)}>
          {l.label}<div className="muted" style={{ fontSize: '.8rem', textTransform: 'none', fontWeight: 400 }}>{l.sub} · {l.skills.length} skills</div>
        </Button>
      ))}
    </div>
  )
}
