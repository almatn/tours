import {StrapiImage} from "@/types/strapi";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://strapi:1337'

async function fetchAPI(path: string) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    cache: 'no-store', // dev mode
  })

  if (!res.ok) {
    console.error(await res.text())
    throw new Error('Failed to fetch API')
  }

  return res.json()
}

export async function getGlobal() {
  const json = await fetchAPI(
    '/api/global?populate[navbar][populate][links]=*'
  )
  console.log('Strapi global data:', json.data)
  if (!json.data) {

    return {
      navbar: {
        links: [],
        ctaLabel: '',
        ctaUrl: '',
      },
    }
  }

  return json.data
}

export async function getLandingPage() {
  const json = await fetchAPI('/api/landing-page?populate[sections][populate]=*')
  console.log('Strapi landing page data:', json.data)

  return json.data as import('@/types/strapi').LandingPage
}

export function getStrapiMedia(url?: string) {
  if (!url) return null

  if (url.startsWith('http')) return url

  return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${url}`
}

export function getStrapiImageUrl(img?: StrapiImage) {
  if (!img?.url) return ""
  if (img.url.startsWith('http')) return img.url
  return `http://localhost:1337${img.url}`
}