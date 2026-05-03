import './App.css'
import { useState } from 'react'
import TripForm from './components/TripForm.tsx'
import ItineraryDisplay from './components/ItineraryDisplay.tsx'
import type { TripResponse } from './types.ts'

function App() {
    const [itinerary, setItinerary] = useState<TripResponse | null>(null)

    function handleItineraryGenerated(response: TripResponse) {
        setItinerary(response)
    }

    return (
        <>
            <TripForm onItineraryGenerated={handleItineraryGenerated} />
            {itinerary !== null && <ItineraryDisplay itinerary={itinerary} />}
        </>
    )
}

export default App
