import type { TripResponse } from '../types.ts'
import DayCard from './DayCard.tsx'
import { HashLoader } from 'react-spinners'

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
        <div className="border-b border-[#123047]/10 bg-[#FFF9F2] px-6 py-6 sm:px-9">
            {isLoading ? (
                <HashLoader color="#126E72" size={100} />
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
        </div>
    )
}
