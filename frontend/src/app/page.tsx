import Hero from '@/app/components/Hero'
import CTA from '@/app/components/CTA'
import { getLandingPage, getStrapiImageUrl } from '@/lib/strapi'
import { Section } from "@/types/strapi"
import TextBlock from "@/app/components/TextBlock"
import ReviewsStrip from "@/app/components/ReviewStrip"

export default async function HomePage() {
  const page = await getLandingPage()

  if (!page) {
    return <div>Failed to load page</div>
  }

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
                        backgroundImage={getStrapiImageUrl(section.backgroundImage)}
                    />
                )

              case 'sections.text-block':
                return (
                    <TextBlock
                        key={section.id}
                        content={section.content}
                        alignment={section.alignment}/>
                )

              case 'sections.cta':
                return (
                    <CTA
                        key={section.id}
                        title={section.heading}
                        body={section.body}
                        buttonLabel={section.primaryLabel}
                        buttonUrl={section.primaryUrl}/>
                )

              case 'sections.review':
                return <ReviewsStrip key={section.id}/>

              default:
                return null
            }
          })}
        </>
  )
}