'use client'

import { useState } from "react"
import { Tour } from "@/types/tour"
import { getStrapiImageUrl } from "@/lib/strapi"
import TourFilterBar from "@/app/components/TourFilter"

interface Type {
  id: number
  name: string
  slug: string
}

interface Props {
  initialTours: Tour[]
  tourTypes: Type[]
}

export default function ToursClient({
  initialTours,
  tourTypes,
}: Props) {
  const [filters, setFilters] = useState({
    types: [] as string[],
  })

  const filteredTours = initialTours.filter((tour) => {
    if (!filters.types.length) return true

    return tour.tour_types?.some((t) =>
      filters.types.includes(t.slug)
    )
  })

  if (!initialTours?.length) {
    return (
      <div className="text-white text-center py-20">
        No tours found
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">

      <h1 className="text-3xl text-white font-light mb-10">
        Tours
      </h1>

      {/* ✅ DYNAMIC FILTER BAR */}
      <TourFilterBar
        types={tourTypes}
        onChange={setFilters}
      />

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {filteredTours.map((tour) => {

          const imageUrl = getStrapiImageUrl(
            tour.images?.[0]
          )

          return (
            <div
              key={tour.id}
              className="border border-white/10 overflow-hidden hover:border-white/30 transition"
            >

              {/* IMAGE */}
              <div className="relative aspect-[4/3]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                  }}
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">

                <h2 className="text-white text-lg">
                  {tour.title}
                </h2>

                <p className="text-white/60 text-sm mt-1">
                  {tour.days} days
                </p>

                {/* LOCATIONS */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {tour.locations?.map((loc) => (
                    <span
                      key={loc.id}
                      className="text-xs px-2 py-1 border border-white/20 text-white/70"
                    >
                      {loc.name}
                    </span>
                  ))}
                </div>

                {/* TYPES */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {tour.tour_types?.map((type) => (
                    <span
                      key={type.id}
                      className="text-xs px-2 py-1 border border-white/20 text-white/70"
                    >
                      {type.name}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}