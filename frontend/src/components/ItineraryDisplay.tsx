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
        <div className="w-full max-w-3xl">
            {isLoading ? (
                <HashLoader color="#126E72" size={100} />
            ) : itinerary !== null ? (
                <div className="overflow-hidden rounded-3xl border border-[#123047]/10 bg-white shadow-[0_24px_70px_-28px_rgba(18,48,71,0.35)]">
                    <div className="border-b border-[#123047]/10 bg-[#FFF9F2] px-6 py-6 sm:px-9">
                        <h2 className="text-2xl font-bold tracking-tight text-[#123047] sm:text-3xl">
                            Your {itinerary.destination} itinerary
                        </h2>
                        <p className="mt-2 text-sm text-[#123047]/65">
                            {itinerary.days} days of plans, with an estimated
                            total of £
                            {itinerary.estimated_costs.toLocaleString()}.
                        </p>
                    </div>
                    <div className="space-y-7 px-6 py-7 sm:px-9 sm:py-9">
                        <div className="space-y-4">
                            {itinerary.day_plans.map((day) => (
                                <DayCard key={day.day_number} day={day} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
            {itinerary !== null && (
                <button
                    className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-xl border border-[#126E72]/25 bg-white px-5 py-3 text-sm font-semibold text-[#126E72] transition hover:bg-[#126E72]/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#126E72]/20"
                    onClick={itineraryReset}
                >
                    Plan another trip
                </button>
            )}
        </div>
    )
}
