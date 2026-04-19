export interface StrapiImage {
  id: number
  url: string
  alternativeText?: string | null
}

export interface Location {
  id: number
  name: string
  slug: string
}

export interface TourType {
  id: number
  name: string
  slug: string
}

export interface Tour {
  id: number
  title: string
  slug: string
  description?: any
  images: StrapiImage[]
  days: number
  locations: Location[]
  tour_types: TourType[]
}

export interface ToursResponse {
  data: Tour[]
}