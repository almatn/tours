import ToursClient from "./ToursClient"
import { getTours, getTourTypes } from "@/lib/strapi"

export default async function ToursPage() {
  const tours = await getTours()
  const tourTypes = await getTourTypes()

  return (
    <ToursClient
      initialTours={tours}
      tourTypes={tourTypes}
    />
  )
}