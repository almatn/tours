'use client'

import { useState } from 'react'
import Link from 'next/link'
import { NavbarData } from '@/types/strapi'

interface Props {
  data: NavbarData
}

const socialLinks = [
  {
    id: "youtube",
    url: "https://youtube.com/@Elgizio",
    icon: "/youtube.svg",
    alt: "YouTube",
  },
  {
    id: "instagram",
    url: "https://instagram.com/elgizio",
    icon: "/instagram.svg",
    alt: "Instagram",
  },
]

export default function Navbar({ data }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-white text-sm tracking-widest uppercase font-medium"
        >
          Elguide
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">

          {data?.links?.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              className="text-white/80 text-xs tracking-widest uppercase hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}

          {/* Social icons */}
          <div className="flex items-center gap-4 ml-4">
            {socialLinks.map((s) => (
              <Link
                key={s.id}
                href={s.url}
                target="_blank"
              >
                <img
                    src={s.icon}
                    alt={s.alt}
                    className="w-5 h-5 invert opacity-80 hover:opacity-100 transition"
                />
              </Link>
            ))}
          </div>
        </nav>

        {/* CTA (desktop) */}
        <div className="hidden md:block">
          {data?.ctaLabel && data?.ctaUrl && (
            <Link
              href={data.ctaUrl}
              className="border border-white px-4 py-1.5 text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition"
            >
              {data.ctaLabel}
            </Link>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
            // X icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M6 18L18 6" stroke="white" strokeWidth="2" />
            </svg>
          ) : (
            // Hamburger icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 pt-4 flex flex-col gap-6 bg-black/90 border-t border-white/10">

          {/* Links */}
          {data?.links?.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              onClick={() => setOpen(false)}
              className="text-white text-xs uppercase tracking-widest"
            >
              {link.label}
            </Link>
          ))}

          {/* CTA */}
          {data?.ctaLabel && data?.ctaUrl && (
            <Link
              href={data.ctaUrl}
              onClick={() => setOpen(false)}
              className="border border-white px-4 py-2 text-xs uppercase tracking-widest text-white text-center"
            >
              {data.ctaLabel}
            </Link>
          )}

          {/* Social icons */}
          <div className="flex gap-5 pt-2">
            {socialLinks.map((s) => (
              <Link
                key={s.id}
                href={s.url}
                target="_blank"
                onClick={() => setOpen(false)}
              >
                <img
                    src={s.icon}
                    alt={s.alt}
                    className="w-5 h-5 invert opacity-80 hover:opacity-100 transition"
                />
              </Link>
            ))}
          </div>

        </div>
      )}
    </header>
  )
}