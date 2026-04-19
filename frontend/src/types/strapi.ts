export interface StrapiImageFormat {
  url: string
  width: number
  height: number
}

export interface StrapiImage {
  id: number
  url: string
  alternativeText?: string | null
  formats?: {
    thumbnail?: StrapiImageFormat
    small?: StrapiImageFormat
    medium?: StrapiImageFormat
    large?: StrapiImageFormat
  }
}

// =========================
// NAVBAR / GLOBAL
// =========================

export interface NavLink {
  id: number
  label: string
  url: string
}

export interface NavbarData {
  links: NavLink[]
  ctaLabel?: string
  ctaUrl?: string
}

export interface Global {
  id: number
  navbar: NavbarData
}

// =========================
// SECTIONS
// =========================

export type HeroSection = {
  __component: 'sections.hero'
  id: number
  heading: string
  subheading?: string
  ctaLabel?: string
  ctaUrl?: string
  backgroundImage?: StrapiImage   // ✅ FIXED
}

export type TextBlock = {
  __component: 'sections.text-block'
  id: number
  content: string
  alignment?: 'left' | 'center' | 'right'
}

export type CTASection = {
  __component: 'sections.cta'
  id: number
  heading: string
  body?: string
  primaryLabel: string
  primaryUrl: string
}

export type ReviewStrip = {
    __component: 'sections.review'
    id: number
    heading: string
    body?: string
    primaryLabel: string
    primaryUrl: string
}

// =========================
// UNION (DYNAMIC ZONE)
// =========================

export type Section =
  | HeroSection
  | TextBlock
  | CTASection
    | ReviewStrip


// =========================
// PAGE
// =========================

export interface LandingPage {
  id: number
  sections: Section[]
}

export interface Media {
  url: string;
  alternativeText?: string;
}

export interface MediaSection {
  id: number;
  __component: "sections.media";
  title: string;
  media: Media;
}