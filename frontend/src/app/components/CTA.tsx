import Link from 'next/link'

interface Props {
  title: string
  body?: string
  buttonLabel: string
  buttonUrl: string
}

export default function CTA({
  title,
  body,
  buttonLabel,
  buttonUrl,
}: Props) {
  return (
    <section className="py-32 text-center border-t border-white/10">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl uppercase mb-6">
          {title}
        </h2>

        {body && (
          <p className="text-white/70 mb-8">
            {body}
          </p>
        )}

        <Link
          href={buttonUrl}
          className="border border-white px-6 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  )
}