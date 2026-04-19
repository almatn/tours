import Link from 'next/link'

interface LinkItem {
  id: number
  label: string
  url: string
}

interface Props {
  links?: LinkItem[]
  siteName?: string
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

export default function Footer({ links = [], siteName = 'Elguide' }: Props) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 flex justify-between">

        {/* Left */}
        <p className="text-white/50 text-sm">
          © {year} {siteName}
        </p>

        {/* Right */}
        <div className="flex gap-6">
          {socialLinks.map((s) => (
              <Link
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  className="text-white/60 hover:text-white text-sm"
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
    </footer>
  )
}