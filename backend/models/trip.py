from pydantic import BaseModel
from datetime import date

class TripRequest(BaseModel):
    destination: str
    days: int
    start_date: str
    budget: float
    pace_preference: str
    interests: list[str]
    number_of_travellers: int

class DayPlan(BaseModel):
    location: str
    budget: float
    day_number: int
    morning_plan: str
    afternoon_plan: str
    evening_plan: str

class TripResponse(BaseModel):
    destination: str
    days: int
    start_date: str
    estimated_costs: float
    day_plans: list[DayPlan]

# class TripEvent(BaseModel):

    