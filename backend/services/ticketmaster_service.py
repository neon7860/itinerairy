from models.trip import TripRequest, TripResponse
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta
import requests

load_dotenv()

def search_events(trip: TripRequest):
    api_key = os.getenv("TICKETMASTER_DISCOVERY_API_KEY")
    start_date = datetime.fromisoformat(trip.start_date).date()
    end_date = start_date + timedelta(days=trip.days - 1)

    response = requests.get(
        "https://app.ticketmaster.com/discovery/v2/events.json",
        params={
            "apikey": api_key,
            "city": trip.destination,
            "startDateTime": f"{start_date:%Y-%m-%d}T00:00:00Z",
            "endDateTime": f"{end_date:%Y-%m-%d}T23:59:59Z",
        },
        timeout=10,
    )
    response.raise_for_status()
    return response.json()