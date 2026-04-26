'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Props {
  heading: string
  subheading?: string
  ctaLabel?: string
  ctaUrl?: string
  backgroundImage?: string
}

export default function Hero({
  heading,
  subheading,
  ctaLabel,
  ctaUrl,
  backgroundImage,
}: Props) {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">

      {/* Background image */}
      {backgroundImage && (
          <><Image
              src={backgroundImage}
              alt={heading}
              fill
              priority
              className="object-cover"
              unoptimized/>
            <Image
              src={backgroundImage}
              alt={heading}
              fill
              priority
              className="object-cover"/></>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 px-6">
        <h1 className="text-5xl md:text-7xl uppercase mb-6">
          {heading}
        </h1>

        {subheading && (
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            {subheading}
          </p>
        )}

        {ctaLabel && ctaUrl && (
          <Link
            href={ctaUrl}
            className="border border-white px-6 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  )
}