interface MediaItem {
  url: string
  alt?: string
}

interface Props {
  media: MediaItem[]
  caption?: string
  fullWidth?: boolean
}

export default function Media({
  media,
  caption,
  fullWidth = false,
}: Props) {
  if (!media?.length) return null

  return (
    <section className="w-full py-10">

      {fullWidth ? (
        <div className="relative w-full aspect-[16/9]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${media[0].url})`,
            }}
          />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {media.map((item, i) => (
            <div key={i} className="relative aspect-square md:aspect-[4/3]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.url})`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {caption && (
        <p className="text-center text-white/60 text-sm mt-4">
          {caption}
        </p>
      )}

    </section>
  )
}