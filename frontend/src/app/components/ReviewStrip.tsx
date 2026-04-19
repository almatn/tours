'use client'

interface Review {
  id: number
  name: string
  text: string
}

const dummyReviews: Review[] = [
  { id: 1, name: 'Alex', text: 'Absolutely stunning experience.' },
  { id: 2, name: 'Maria', text: 'Best trip of my life.' },
  { id: 3, name: 'John', text: 'Unreal landscapes and culture.' },
]

export default function ReviewsStrip() {
  return (
    <section className="py-16 border-t border-white/10 overflow-hidden">
      <div className="flex gap-12 animate-scroll whitespace-nowrap px-6">
        {dummyReviews.map((r) => (
          <div key={r.id} className="min-w-[300px]">
            <p className="text-white/80 italic">${r.text}</p>
            <p className="text-white/50 text-sm mt-2">— {r.name}</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0) }
          100% { transform: translateX(-50%) }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  )
}