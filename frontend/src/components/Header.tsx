export default function Header() {
    return (
        <div className="mb-7 w-full max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#126E72]">
                ItinerAIry <span aria-hidden="true"></span>
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#123047] sm:text-4xl">
                Plan your trip in minutes
            </h1>
            <p className="mt-3 text-base text-[#123047]/70 sm:text-lg">
                Pick a destination, budget and pace. Get a day-by-day plan.
            </p>
        </div>
    )
}
