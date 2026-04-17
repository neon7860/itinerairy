import type { TripRequest, TripResponse } from "../types.ts";

export async function generateItinerary(tripData: TripRequest): Promise<TripResponse> {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/trips",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tripData)
        })
        return response.json()
    } catch(err){
        console.log(`Error: ${err}`)
        throw err
    }
}