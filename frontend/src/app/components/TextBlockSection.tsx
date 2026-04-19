interface Props {
  content: string
  alignment?: 'left' | 'center' | 'right'
}

export default function TextBlockSection({ content, alignment = 'left' }: Props) {
  return (
    <section className="py-24 border-t border-white/10">
      <div
        className={`max-w-3xl mx-auto px-6 prose prose-invert ${
          alignment === 'center' ? 'text-center' : ''
        }`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  )
}