import {StrapiImage} from "@/types/strapi";
import {Tour} from "@/types/tour";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://elguide.buybuy.kg/strapi'

async function fetchAPI(path: string) {
  try {
    const res = await fetch(`${STRAPI_URL}${path}`)

    if (!res.ok) {
      console.error(await res.text())
      return null
    }

    return await res.json()
  } catch (e) {
    console.error('Fetch failed (likely build time):', e)
    return null
  }
}

export async function getGlobal() {
  try {
    const json = await fetchAPI(
      '/api/global?populate[navbar][populate][links]=*'
    )

    if (!json?.data) {
      return {
        navbar: {
          links: [],
          ctaLabel: '',
          ctaUrl: '',
        },
      }
    }

    return json.data
  } catch (e) {
    console.error('Error fetching global:', e)
    return {
      navbar: {
        links: [],
        ctaLabel: '',
        ctaUrl: '',
      },
    }
  }
}

export async function getLandingPage() {
  try {
  const json = await fetchAPI('/api/landing-page?populate[sections][populate]=*')
  return json.data as import('@/types/strapi').LandingPage
  } catch (e) {
    console.error('Error fetching landing page:', e)
    return null
  }
}

export function getStrapiImageUrl(img?: StrapiImage): string {
  if (!img?.url) return ""
  if (img.url.startsWith("http")) return img.url
  return `${img.url}`
}

export interface TourFilters {
  types?: string[]
  locations?: string[]
  minDays?: number
  maxDays?: number
}

export async function getTours(
  filters?: TourFilters
): Promise<Tour[]> {
  try {
     const query = new URLSearchParams()

  query.append("populate", "*")

  // types
  filters?.types?.forEach((t) => {
    query.append("filters[tour_types][slug][$in]", t)
  })

  // locations
  filters?.locations?.forEach((l) => {
    query.append("filters[locations][slug][$in]", l)
  })

  if (filters?.minDays) {
    query.append("filters[days][$gte]", String(filters.minDays))
  }

  if (filters?.maxDays) {
    query.append("filters[days][$lte]", String(filters.maxDays))
  }

  const json = await fetchAPI(`/api/tours?${query.toString()}`)

  return json.data ?? []
  } catch (e) {
    console.error('Error fetching tours:', e)
    return []
  }
}

export async function getTourTypes() {
  try {
    const json = await fetchAPI(`/api/tour-types`)

  return json.data ?? []
  } catch (e) {
    console.error('Error fetching tour types:', e)
    return []
  }
}