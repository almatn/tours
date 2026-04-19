import Hero from '@/app/components/Hero'
import CTA from '@/app/components/CTA'
import {getLandingPage, getStrapiImageUrl} from '@/lib/strapi'
import {HeroSection, Section, StrapiImage} from "@/types/strapi";
import TextBlock from "@/app/components/TextBlock";
import ReviewsStrip from "@/app/components/ReviewStrip";
import Footer from "@/app/components/Footer";
import Media from "@/app/components/Media";

export default async function HomePage() {
  const page = await getLandingPage()
  const hero = page.sections.find(
    (s): s is HeroSection => s.__component === 'sections.hero'
  )

  const imageUrl= getStrapiImageUrl(hero?.backgroundImage)

  if (!page) return null

  return (
  <>
    {page.sections.map((section: Section) => {
      switch (section.__component) {

        case 'sections.hero':
          return (
            <Hero
              key={section.id}
              heading={section.heading}
              subheading={section.subheading}
              ctaLabel={section.ctaLabel}
              ctaUrl={section.ctaUrl}
              backgroundImage={imageUrl}
            />
          )

        case 'sections.text-block':
          return (
            <TextBlock
              key={section.id}
              content={section.content}
              alignment={section.alignment}
            />
          )

        case 'sections.cta':
          return (
            <CTA
              key={section.id}
              title={section.heading}
              body={section.body}
              buttonLabel={section.primaryLabel}
              buttonUrl={section.primaryUrl}
            />
          )

        case 'sections.review':
          return (
            <ReviewsStrip key={section.id} />
          )
        case 'sections.media': {
          const media = (section.media ?? []).map((m: StrapiImage) => ({
            url: getStrapiImageUrl(m),
            alt: m.alternativeText ?? undefined,
          }))

          return (
            <Media
              key={section.id}
              media={media}
              caption={section.caption}
              fullWidth={section.fullWidth}
            />
          )
        }
        default:
          return null
      }
    })}
  </>
)
}