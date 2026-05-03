import type { TripResponse } from '../types.ts'

interface itineraryProps {
    itinerary: TripResponse
}

export default function ItineraryDisplay({ itinerary }: itineraryProps) {
    return (
        <>
            <h1>Data</h1>
            <p>Destination: {itinerary.destination}</p>
            <p>Days: {itinerary.days}</p>
            <p>Estimated costs: {itinerary.estimated_costs}</p>
            <p>Day1 overview: {itinerary.day_plans[0].location}</p>
        </>
    )
}
