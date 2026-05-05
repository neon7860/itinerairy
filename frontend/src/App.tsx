import './App.css'
import { useState } from 'react'
import TripForm from './components/TripForm.tsx'
import ItineraryDisplay from './components/ItineraryDisplay.tsx'
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

    return (
        <>
            <TripForm
                onItineraryGenerated={handleItineraryGenerated}
                onItineraryLoading={handleItineraryLoading}
            />
            {itinerary !== null && (
                <ItineraryDisplay itinerary={itinerary} isLoading={loading} />
            )}
        </>
    )
}

export default App
