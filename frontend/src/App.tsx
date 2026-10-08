import './App.css'
import { useState } from 'react'
import TripForm from './components/TripForm.tsx'
import ItineraryDisplay from './components/ItineraryDisplay.tsx'
import Header from './components/Header.tsx'
import type { TripResponse } from './types.ts'

function App() {
    const [itinerary, setItinerary] = useState<TripResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    function handleItineraryGenerated(response: TripResponse) {
        setItinerary(response)
    }

    function handleItineraryLoading(response: boolean) {
        setLoading(response)
    }

    function handleItineraryReset() {
        setItinerary(null)
    }

    return (
        <main className="relative isolate flex min-h-screen flex-col items-center overflow-hidden bg-[#FFF9F2] px-4 py-10 sm:py-14">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 -top-32 -z-10 h-96 w-96 rounded-full bg-[#126E72]/10 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-96 w-96 rounded-full bg-[#E76F51]/10 blur-3xl"
            />
            <Header />
            {loading ? (
                <div className="flex w-full flex-1 items-center justify-center">
                    <ItineraryDisplay
                        itinerary={itinerary}
                        isLoading={loading}
                        itineraryReset={handleItineraryReset}
                    />
                </div>
            ) : itinerary !== null ? (
                <ItineraryDisplay
                    itinerary={itinerary}
                    isLoading={loading}
                    itineraryReset={handleItineraryReset}
                />
            ) : (
                <TripForm
                    onItineraryGenerated={handleItineraryGenerated}
                    onItineraryLoading={handleItineraryLoading}
                />
            )}
        </main>
    )
}

export default App
