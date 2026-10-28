from models.trip import TripRequest, TripResponse
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta

load_dotenv()

def search_events(trip: TripRequest):
    api_key = os.getenv("TICKETMASTER_DISCOVERY_API_KEY")
    trip_start = trip.start_date

    time_period = datetime.fromisoformat(trip_start) + timedelta(days=(trip.days - 1))
    trip_end = time_period.isoformat()

    