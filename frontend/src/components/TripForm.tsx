import { useState } from 'react'
import type { TripRequest } from '../types.ts'
import { generateItinerary } from '../services/api.ts'

export default function TripForm() {
    const [formData, setFormData] = useState<TripRequest>({
        destination: '',
        days: 0,
        budget: 0,
        pace_preference: '',
        interests: [],
        number_of_travellers: 0,
    })

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()
        try {
            console.log('Sending response!')
            const res = await generateItinerary(formData)
            console.log(res)
        } catch (err) {
            console.log(`Error: ${err}`)
            throw err
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Enter your destination:</label>
            <input
                type="text"
                value={formData.destination}
                onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                }
            ></input>

            <label>Enter the number of days you will stay for:</label>
            <input
                type="number"
                value={formData.days}
                onChange={(e) =>
                    setFormData({ ...formData, days: parseInt(e.target.value) })
                }
            ></input>

            <label>Enter your budget:</label>
            <input
                type="number"
                value={formData.budget}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        budget: parseInt(e.target.value),
                    })
                }
            ></input>

            <label>
                Enter your pace preference of your trip (fast, medium, slow):
            </label>
            <label>
                <input
                    type="radio"
                    name="pace"
                    value="slow"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            pace_preference: e.target.value,
                        })
                    }
                ></input>
                Slow paced
            </label>
            <label>
                <input
                    type="radio"
                    name="pace"
                    value="medium"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            pace_preference: e.target.value,
                        })
                    }
                    checked={true}
                ></input>
                Medium paced
            </label>
            <label>
                <input
                    type="radio"
                    name="pace"
                    value="fast"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            pace_preference: e.target.value,
                        })
                    }
                ></input>
                Fast paced
            </label>

            <label>Enter your interests below:</label>
            <input
                type="text"
                value={formData.interests}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        interests: e.target.value.split(','),
                    })
                }
            ></input>

            <label>Enter the number of travellers:</label>
            <input
                type="number"
                value={formData.number_of_travellers}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        number_of_travellers: parseInt(e.target.value),
                    })
                }
            ></input>

            <p>Destination: {formData.destination}</p>
            <p>Number of days: {formData.days || 0}</p>
            <p>Budget: {formData.budget || 0}</p>
            <p>Pace: {formData.pace_preference}</p>
            <p>Interests: {formData.interests}</p>
            <p>Number of travellers: {formData.number_of_travellers} || 1</p>

            <button type="submit">Get Itinerary</button>
        </form>
    )
}
