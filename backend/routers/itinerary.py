from fastapi import APIRouter, HTTPException
from models.trip import TripRequest, TripResponse
from services.ai_service import generate_itinerary

router = APIRouter()

@router.post("/trips", response_model=TripResponse)
def itinerary_response(trip_request: TripRequest):
    try:
        ai_response = generate_itinerary(trip_request)
        return ai_response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something went wrong: {e}")