from fastapi import APIRouter
from models.trip import TripRequest, DayPlan, TripResponse
from services.ai_service import generate_itinerary

router = APIRouter()

@router.post("/trips", response_model=TripResponse)
def itinerary_response(trip_request: TripRequest):
    ai_response = generate_itinerary(trip_request)
    
    return ai_response