import type { TripResponse } from '../types.ts'
import DayCard from './DayCard.tsx'

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
            <div>
                {itinerary.day_plans.map((day) => (
                    <DayCard key={day.day_number} day={day} />
                ))}
            </div>
        </>
    )
}
