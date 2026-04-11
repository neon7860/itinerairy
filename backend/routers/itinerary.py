from fastapi import APIRouter
from models.trip import TripRequest, DayPlan, TripResponse
from services.ai_service import generate_itinerary

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
    ai_response = generate_itinerary(generate_itinerary)
    
    return ai_response