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
        <main className="min-h-screen flex flex-col items-center justify-center bg-[#126E72] px-4 py-8">
            <Header />
            <TripForm
                onItineraryGenerated={handleItineraryGenerated}
                onItineraryLoading={handleItineraryLoading}
            />
            {(loading || itinerary !== null) && (
                <ItineraryDisplay
                    itinerary={itinerary}
                    isLoading={loading}
                    itineraryReset={handleItineraryReset}
                />
            )}
        </main>
    )
}

export default App
