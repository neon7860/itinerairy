export interface TripRequest{
    destination: string
    days: number
    budget: number
    pace_preference: string
    interests: string[]
    number_of_travellers: number
}

export interface DayPlan{
    location: string
    budget: number
    day_number: number
    morning_plan: string
    afternoon_plan: string
    evening_plan: string
}

export interface TripResponse{
    destination: string
    days: number
    estimated_costs: number
    day_plans: DayPlan[]
}