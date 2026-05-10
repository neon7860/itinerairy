import type { TripResponse } from '../types.ts'
import DayCard from './DayCard.tsx'

interface itineraryProps {
    itinerary: TripResponse | null
    isLoading: boolean
    itineraryReset: () => void
}

export default function ItineraryDisplay({
    itinerary,
    isLoading,
    itineraryReset,
}: itineraryProps) {
    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : itinerary !== null ? (
                <>
                    <h1>Data</h1>
                    <p>Destination: {itinerary.destination}</p>
                    <p>Days: {itinerary.days}</p>
                    <p>Estimated costs: {itinerary.estimated_costs}</p>
                    <div>
                        {itinerary.day_plans.map((day) => (
                            <DayCard key={day.day_number} day={day} />
                        ))}
                    </div>
                </>
            ) : null}
            {itinerary !== null && (
                <button onClick={itineraryReset}>Plan another trip</button>
            )}
        </>
    )
}
