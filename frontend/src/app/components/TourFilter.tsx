'use client'

import { useState } from "react"

interface Type {
  id: number
  name: string
  slug: string
}

interface Props {
  types: Type[]
  onChange: (filters: { types: string[] }) => void
}

export default function TourFilterBar({ types, onChange }: Props) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (value: string) => {
    const updated = selected.includes(value)
      ? selected.filter((t) => t !== value)
      : [...selected, value]

    setSelected(updated)
    onChange({ types: updated })
  }

  return (
    <div className="flex flex-wrap gap-3 mb-10">

      {types.map((type) => (
        <button
          key={type.id}
          onClick={() => toggle(type.slug)}
          className={`px-4 py-2 text-xs uppercase border transition
            ${
              selected.includes(type.slug)
                ? "bg-white text-black"
                : "text-white border-white/30"
            }
          `}
        >
          {type.name}
        </button>
      ))}

    </div>
  )
}