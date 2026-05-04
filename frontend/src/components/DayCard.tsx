import type { DayPlan } from '../types'

interface DayCardProps {
    day: DayPlan
}

export default function DayCard({ day }: DayCardProps) {
    return (
        <div>
            <h2>Day Plan {day.day_number}</h2>
            <span>{day.location}</span>
            <span>{day.budget}</span>
            <p>{day.morning_plan}</p>
            <p>{day.afternoon_plan}</p>
            <p>{day.evening_plan}</p>
        </div>
    )
}
