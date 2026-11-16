import { useState } from 'react'
import { exerciseArt } from './figures.js'
import { SkillFigure } from './skills/SkillFigure.jsx'
import { Button } from '@/components/ui/button'

function Figure({ fig, label }) {
  return <SkillFigure zoom fig={fig} label={label} className="min-w-0 flex-1" />
}

// Small "How to" button that opens a popup with start/end illustrations; renders nothing without art.
export default function HowTo({ name }) {
  const [open, setOpen] = useState(false)
  const art = exerciseArt(name)
  if (!art) return null
  return (
    <>
      <Button variant="outline" size="sm" className="absolute bottom-3 left-1/2 -translate-x-1/2" onClick={() => setOpen(true)}>How to</Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setOpen(false)}>
          <div className="card flex max-h-[92dvh] w-full max-w-md flex-col gap-3 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-center text-xl">{name}</h2>
            {art.views.map((v) => (
              <div key={v.label} className="flex gap-2">
                <Figure fig={v.figures[0]} label={`${v.label} · start`} />
                <Figure fig={v.figures[1]} label={`${v.label} · end`} />
              </div>
            ))}
            <p className="muted m-0 text-center text-sm">{art.note}</p>
            <Button variant="muted" onClick={() => setOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </>
  )
}
