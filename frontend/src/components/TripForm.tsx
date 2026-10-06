import { useState } from 'react'
import type { TripRequest, TripResponse } from '../types.ts'
import { generateItinerary } from '../services/api.ts'

interface TripResponseForm {
    onItineraryGenerated: (data: TripResponse) => void
    onItineraryLoading: (data: boolean) => void
}

export default function TripForm({
    onItineraryGenerated,
    onItineraryLoading,
}: TripResponseForm) {
    const initialFormState: TripRequest = {
        destination: '',
        days: 0,
        budget: 0,
        pace_preference: '',
        interests: [],
        number_of_travellers: 0,
    }

    const [formData, setFormData] = useState<TripRequest>(initialFormState)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()
        setErrorMessage('')
        setIsSubmitting(true)
        try {
            onItineraryLoading(true)
            const res = await generateItinerary(formData)
            onItineraryGenerated(res)
            setFormData(initialFormState)
        } catch {
            setErrorMessage(
                'We could not create your itinerary just now. Please try again.'
            )
        } finally {
            setIsSubmitting(false)
            onItineraryLoading(false)
        }
    }

    return (
        <div className="w-full max-w-3xl">
            <form
                onSubmit={handleSubmit}
                className="overflow-hidden rounded-3xl border border-[#123047]/10 bg-white shadow-[0_24px_70px_-28px_rgba(18,48,71,0.35)]"
            >
                <div className="border-b border-[#123047]/10 bg-[#FFF9F2] px-6 py-6 sm:px-9">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#126E72]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#126E72]">
                        <span aria-hidden="true">✦</span> Your trip, your way
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#123047] sm:text-3xl">
                        Let’s plan somewhere wonderful
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-[#123047]/70 sm:text-base">
                        Share a few details and we’ll shape them into a
                        day-by-day adventure.
                    </p>
                </div>

                <div className="space-y-7 px-6 py-7 sm:px-9 sm:py-9">
                    <div>
                        <label
                            htmlFor="destination"
                            className="mb-2 block text-sm font-semibold text-[#123047]"
                        >
                            Where are you headed?
                        </label>
                        <input
                            id="destination"
                            className="w-full rounded-xl border border-[#123047]/20 bg-white px-4 py-3 text-[#123047] outline-none transition placeholder:text-[#123047]/40 focus:border-[#126E72] focus:ring-4 focus:ring-[#126E72]/10"
                            placeholder="e.g. Bilbao, Spain"
                            type="text"
                            autoComplete="country-name"
                            required
                            value={formData.destination}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    destination: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="days"
                                className="mb-2 block text-sm font-semibold text-[#123047]"
                            >
                                How long are you staying?
                            </label>
                            <div className="relative">
                                <input
                                    id="days"
                                    className="w-full rounded-xl border border-[#123047]/20 bg-white px-4 py-3 pr-16 text-[#123047] outline-none transition placeholder:text-[#123047]/40 focus:border-[#126E72] focus:ring-4 focus:ring-[#126E72]/10"
                                    type="number"
                                    min="1"
                                    max="30"
                                    placeholder="5"
                                    required
                                    value={formData.days || ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            days: parseInt(e.target.value) || 0,
                                        })
                                    }
                                />
                                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-[#123047]/50">
                                    days
                                </span>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="budget"
                                className="mb-2 block text-sm font-semibold text-[#123047]"
                            >
                                What’s your total budget?
                            </label>
                            <div className="relative">
                                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#123047]/60">
                                    £
                                </span>
                                <input
                                    id="budget"
                                    className="w-full rounded-xl border border-[#123047]/20 bg-white py-3 pl-9 pr-4 text-[#123047] outline-none transition placeholder:text-[#123047]/40 focus:border-[#126E72] focus:ring-4 focus:ring-[#126E72]/10"
                                    type="number"
                                    min="1"
                                    placeholder="500"
                                    required
                                    value={formData.budget || ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            budget:
                                                parseInt(e.target.value) || 0,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <fieldset>
                        <legend className="text-sm font-semibold text-[#123047]">
                            What pace feels right?
                        </legend>
                        <p className="mb-3 mt-1 text-sm text-[#123047]/60">
                            Choose how much you’d like to fit into each day.
                        </p>
                        <div className="grid gap-3 sm:grid-cols-3">
                            {[
                                {
                                    value: 'slow',
                                    label: 'Slow',
                                    detail: 'Time to wander',
                                },
                                {
                                    value: 'medium',
                                    label: 'Balanced',
                                    detail: 'A bit of everything',
                                },
                                {
                                    value: 'fast',
                                    label: 'Full-on',
                                    detail: 'Make every moment count',
                                },
                            ].map((pace) => (
                                <label
                                    key={pace.value}
                                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${formData.pace_preference === pace.value ? 'border-[#126E72] bg-[#126E72]/5 ring-2 ring-[#126E72]/15' : 'border-[#123047]/15 hover:border-[#126E72]/50 hover:bg-[#FFF9F2]'}`}
                                >
                                    <input
                                        className="mt-1 accent-[#126E72]"
                                        type="radio"
                                        name="pace"
                                        value={pace.value}
                                        required
                                        checked={
                                            formData.pace_preference ===
                                            pace.value
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                pace_preference: e.target.value,
                                            })
                                        }
                                    />
                                    <span>
                                        <span className="block text-sm font-semibold text-[#123047]">
                                            {pace.label}
                                        </span>
                                        <span className="mt-0.5 block text-xs text-[#123047]/60">
                                            {pace.detail}
                                        </span>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <div className="grid gap-5 sm:grid-cols-[1fr_190px]">
                        <div>
                            <label
                                htmlFor="interests"
                                className="mb-2 block text-sm font-semibold text-[#123047]"
                            >
                                What do you love doing?
                            </label>
                            <div className="w-full flex gap-2">
                                <input
                                    id="interests"
                                    className="min-w-0 flex-1 rounded-xl border border-[#123047]/20 bg-white px-4 py-3 text-[#123047] outline-none transition placeholder:text-[#123047]/40 focus:border-[#126E72] focus:ring-4 focus:ring-[#126E72]/10"
                                    placeholder="Food, art, history, beaches…"
                                    type="text"
                                    value={formData.interests.join(', ')}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            interests: e.target.value
                                                .split(',')
                                                .map((interest) =>
                                                    interest.trim()
                                                ),
                                        })
                                    }
                                />
                                <button className="shrink-0 cursor-pointer rounded-lg bg-[#126E72] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#0f5e62] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#126E72]/30">
                                    Add interest
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-[#123047]/55">
                                Separate a few interests with commas.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {formData.interests.map((interest) => {
                                    return (
                                        <div>
                                            <ul>
                                                <li className="w-fit rounded-full border border-[#123047]/20 px-3 py-1.5 text-sm">
                                                    {interest}
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="travellers"
                                className="mb-2 block text-sm font-semibold text-[#123047]"
                            >
                                Travellers
                            </label>
                            <input
                                id="travellers"
                                className="w-full rounded-xl border border-[#123047]/20 bg-white px-4 py-3 text-[#123047] outline-none transition placeholder:text-[#123047]/40 focus:border-[#126E72] focus:ring-4 focus:ring-[#126E72]/10"
                                type="number"
                                min="1"
                                max="20"
                                placeholder="2"
                                required
                                value={formData.number_of_travellers || ''}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        number_of_travellers:
                                            parseInt(e.target.value) || 0,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <p
                            role="alert"
                            className="rounded-xl border border-[#E76F51]/30 bg-[#E76F51]/10 px-4 py-3 text-sm text-[#123047]"
                        >
                            {errorMessage}
                        </p>
                    )}

                    <div className="border-t border-[#123047]/10 pt-6">
                        <button
                            className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-[#E76F51] px-5 py-4 font-bold text-white shadow-lg shadow-[#E76F51]/20 transition hover:-translate-y-0.5 hover:bg-[#d95f42] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E76F51]/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto sm:min-w-56"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? 'Creating your itinerary…'
                                : 'Create my itinerary'}
                            {!isSubmitting && <span aria-hidden="true">→</span>}
                        </button>
                        <p className="mt-3 text-xs text-[#123047]/55">
                            Let's create your plan.
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}
