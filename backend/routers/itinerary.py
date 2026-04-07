from fastapi import APIRouter
from models.trip import TripRequest, DayPlan, TripResponse

router = APIRouter()

@router.post("/trips", response_model=TripResponse)
def itinerary_response(trip_request: TripRequest):
    day = DayPlan(
        day_number=1,
        location="Tokyo",
        budget=285.0,
        morning_plan="Visit Senso-ji Temple",
        afternoon_plan="Explore Akihabara",
        evening_plan="Dinner in Shinjuku"
    )
    
    return TripResponse(destination=trip_request.destination, days=trip_request.days, estimated_costs=trip_request.budget, day_plans=[day])