import { useMemo, useState } from 'react'
import { CORE_CIRCUIT, EXERCISES, HIIT_EXERCISES, MUSCLES, PULLBAR_EXERCISES, CATEGORIES } from './data.js'
import { getCustomExercises, saveCustomExercises } from './storage.js'
import Header from './Header.jsx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const uid = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`
const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

export const intervalSeconds = (w) => w.rounds * w.intervals.reduce((a, x) => a + x.work + x.rest, 0) - (w.intervals.at(-1)?.rest ?? 0)
export const fmtTotal = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

// − [value] + control; typing is allowed too and is clamped when the field loses focus.
function Stepper({ label, value, onChange, min, max, step = 5, suffix = '' }) {
  const [text, setText] = useState(null)
  const commit = () => {
    if (text !== null) onChange(clamp(parseInt(text, 10) || min, min, max))
    setText(null)
  }
  return (
    <div className="flex flex-1 flex-col items-center gap-1">
      <span className="muted text-xs uppercase tracking-widest">{label}</span>
      <div className="flex w-full items-center gap-1.5">
        <Button size="icon" aria-label={`Decrease ${label}`} onClick={() => onChange(clamp(value - step, min, max))}>−</Button>
        <Input
          className="min-w-0 flex-1 px-1 text-center font-[family-name:var(--display)] text-2xl font-bold"
          type="number" inputMode="numeric" value={text ?? value}
          onFocus={(e) => e.target.select()} onChange={(e) => setText(e.target.value)} onBlur={commit}
        />
        <Button size="icon" aria-label={`Increase ${label}`} onClick={() => onChange(clamp(value + step, min, max))}>+</Button>
      </div>
      {suffix && <span className="muted text-xs">{suffix}</span>}
    </div>
  )
}

export default function IntervalBuilder({ draft, onCancel, onSave }) {
  const [name, setName] = useState(draft.name)
  const [rounds, setRounds] = useState(draft.rounds)
  const [intervals, setIntervals] = useState(draft.intervals)
  const [pickFor, setPickFor] = useState(null)

  const patch = (key, changes) => setIntervals((l) => l.map((x) => (x.key === key ? { ...x, ...changes } : x)))
  const add = () => setIntervals((l) => [...l, { key: uid(), name: '', muscles: [], work: l.at(-1)?.work ?? 30, rest: l.at(-1)?.rest ?? 15 }])
  const move = (i, d) => setIntervals((l) => {
    const j = i + d
    if (j < 0 || j >= l.length) return l
    const next = [...l]
    ;[next[i], next[j]] = [next[j], next[i]]
    return next
  })

  const total = useMemo(() => intervalSeconds({ rounds, intervals }), [rounds, intervals])

  if (pickFor) {
    return (
      <ExercisePicker
        onBack={() => setPickFor(null)}
        onPick={(ex) => { patch(pickFor, { name: ex.name, muscles: ex.muscles ?? [] }); setPickFor(null) }}
      />
    )
  }

  return (
    <div className="screen">
      <Header title={draft.name ? 'Edit interval workout' : 'New interval workout'} onBack={onCancel} />
      <Input placeholder="Workout name (e.g. Handstand rounds)" value={name} maxLength={30} onChange={(e) => setName(e.target.value)} />

      <Card>
        <Stepper label="Rounds" value={rounds} onChange={setRounds} min={1} max={20} step={1} suffix="whole list repeated" />
      </Card>

      {intervals.map((x, i) => (
        <Card key={x.key}>
          <div className="exhead">
            <b>Interval {i + 1}</b>
            <div>
              <Button size="icon" onClick={() => move(i, -1)} aria-label="Move up">↑</Button>
              <Button size="icon" onClick={() => move(i, 1)} aria-label="Move down">↓</Button>
              <Button size="icon" disabled={intervals.length === 1} onClick={() => setIntervals((l) => l.filter((y) => y.key !== x.key))} aria-label="Remove">✕</Button>
            </div>
          </div>
          <div className="my-3 flex items-center gap-2">
            <Button variant="secondary" size="sm" className="flex-1" onClick={() => setPickFor(x.key)}>{x.name || 'Choose exercise (optional)'}</Button>
            {x.name && <Button size="icon" aria-label="Clear exercise" onClick={() => patch(x.key, { name: '', muscles: [] })}>✕</Button>}
          </div>
          <div className="flex gap-3">
            <Stepper label="Work" value={x.work} onChange={(v) => patch(x.key, { work: v })} min={5} max={600} suffix="sec" />
            <Stepper label="Rest" value={x.rest} onChange={(v) => patch(x.key, { rest: v })} min={0} max={600} suffix="sec" />
          </div>
        </Card>
      ))}

      <Button variant="secondary" onClick={add}>+ Add interval</Button>
      <div className="muted text-center text-sm">{intervals.length} intervals × {rounds} {rounds === 1 ? 'round' : 'rounds'} · about {fmtTotal(total)} min</div>
      <Button variant="bank" size="lg" disabled={!name.trim()} onClick={() => onSave({ ...draft, name: name.trim(), rounds, intervals })}>Save</Button>
    </div>
  )
}

function ExercisePicker({ onBack, onPick }) {
  const [library, setLibrary] = useState(getCustomExercises)
  const [newName, setNewName] = useState('')
  const [newMuscles, setNewMuscles] = useState([])
  const [saveToLibrary, setSaveToLibrary] = useState(true)

  const groups = useMemo(() => {
    const seen = new Set()
    const unique = (list) => list.filter((x) => !seen.has(x.name) && seen.add(x.name))
    const built = [
      ...(library.length ? [['My exercises', '#f2b705', unique(library)]] : []),
      ['HIIT', CATEGORIES.hiit.color, unique(HIIT_EXERCISES)],
      ['Core', CATEGORIES.core.color, unique(CORE_CIRCUIT)],
      ['Pull-up Bar Only', CATEGORIES.pullbar.color, unique(PULLBAR_EXERCISES)],
      ...Object.entries(EXERCISES).map(([k, list]) => [CATEGORIES[k].label, CATEGORIES[k].color, unique(list)]),
    ]
    return built.filter(([, , list]) => list.length)
  }, [library])

  const create = () => {
    const ex = { name: newName.trim(), weighted: false, muscles: newMuscles }
    if (!ex.name) return
    if (saveToLibrary && !library.some((x) => x.name.toLowerCase() === ex.name.toLowerCase())) {
      const next = [...library, ex]
      saveCustomExercises(next)
      setLibrary(next)
    }
    onPick(ex)
  }

  return (
    <div className="screen">
      <Header title="Choose exercise" onBack={onBack} />
      <Card>
        <b>Create new exercise</b>
        <Input style={{ margin: '10px 0' }} placeholder="Name (e.g. Handstand hold)" value={newName} maxLength={30} onChange={(e) => setNewName(e.target.value)} />
        <ToggleGroup type="multiple" value={newMuscles} onValueChange={setNewMuscles} className="flex flex-wrap gap-2">
          {MUSCLES.map((m) => <ToggleGroupItem key={m} value={m} size="sm">{m}</ToggleGroupItem>)}
        </ToggleGroup>
        <label className="muted mt-3 block"><input type="checkbox" checked={saveToLibrary} onChange={(e) => setSaveToLibrary(e.target.checked)} /> Add to my library</label>
        <Button variant="secondary" style={{ marginTop: 12 }} disabled={!newName.trim()} onClick={create}>Create &amp; use</Button>
      </Card>
      {groups.map(([label, color, list]) => (
        <div key={label}>
          <Badge style={{ '--c': color, marginBottom: 8 }}>{label}</Badge>
          {list.map((ex) => (
            <button key={ex.name} className="pick" onClick={() => onPick(ex)}><span>{ex.name}</span><span className="muted">+</span></button>
          ))}
        </div>
      ))}
    </div>
  )
}
