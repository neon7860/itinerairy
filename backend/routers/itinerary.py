import logging
from fastapi import APIRouter, HTTPException
from models.trip import TripRequest, TripResponse
from services.ai_service import generate_itinerary
from services.ticketmaster_service import search_events

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/trips", response_model=TripResponse)
def itinerary_response(trip_request: TripRequest):
    try:
        events = search_events(trip_request)
        print("Ticketmaster events:", events)
        logger.info("Ticketmaster lookup completed; starting itinerary generation")
        ai_response = generate_itinerary(trip_request)
        logger.info("Itinerary generation completed")
        return ai_response
    except HTTPException:
        logger.exception("HTTP error while creating itinerary")
        raise
    except Exception as e:
        logger.exception("Unexpected error while creating itinerary")
        raise HTTPException(status_code=500, detail=f"Something went wrong: {e}")