'use client'

interface Props {
  content: string
  alignment?: 'left' | 'center' | 'right'
}

export default function TextBlock({ content, alignment = 'left' }: Props) {
  const alignClass =
    alignment === 'center'
      ? 'text-center'
      : alignment === 'right'
      ? 'text-right'
      : 'text-left'

  return (
    <section className="py-24 border-t border-white/10">
      <div
        className={`max-w-3xl mx-auto px-6 ${alignClass}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  )
}