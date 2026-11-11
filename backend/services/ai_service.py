from models.trip import TripRequest, TripResponse
import os
from openai import OpenAI
from dotenv import load_dotenv
import json
from fastapi import HTTPException
from services.ticketmaster_service import search_events
import logging

load_dotenv()

logger = logging.getLogger(__name__)

endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
deployment_name = os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME")
api_key = os.getenv("AZURE_OPENAI_API_KEY")

client = OpenAI(
    base_url=endpoint,
    api_key=api_key
)

def generate_itinerary(trip: TripRequest):
    events = search_events(trip)
    logger.info("Ticketmaster lookup completed; starting itinerary generation")
    print("Ticketmaster events:", events)

    response = client.responses.create(
        model=deployment_name,
        max_output_tokens=min(2500 + trip.days * 600, 9000),
        reasoning={"effort": "low"},
        input=[
            {"role": "system", "content": """
You are an expert travel planner with deep knowledge of destinations worldwide. 
You create detailed, personalised day-by-day itineraries based on the traveller's 
preferences, budget, and interests.

You must respond ONLY with a valid JSON object matching the schema below. Do not include
introductory text, explanations, or Markdown code fences around the JSON.

The morning_plan, afternoon_plan, and evening_plan values are the content of sections
whose headings are already displayed by the app. Do not include period labels such as
"Morning", "Afternoon", or "Evening" in those values.

Use Markdown only for inline emphasis (for example, **bold text**) and links
(for example, [place name](https://example.com)). Do not use headings, lists,
blockquotes, code fences, HTML, or strikethrough (~~text~~). Provide only the final
recommendation; do not show edits, crossed-out text, alternatives, or commentary about
changing your recommendation.

The JSON must follow this exact structure:
{
    "destination": "string",
    "days": integer,
    "start_date": date,
    "estimated_costs": float,
    "day_plans": [
        {
            "day_number": integer,
            "location": "string",
            "budget": float,
            "morning_plan": "string",
            "afternoon_plan": "string",
            "evening_plan": "string"
        }
    ]
}

Rules:
- Generate one day_plan object for every day of the trip
- Keep activities realistic and specific to the destination
- Distribute the budget evenly across days
- Tailor activities to the traveller's interests and pace preference
- morning_plan, afternoon_plan and evening_plan should be detailed and specific
- Use Ticketmaster events only when they fall within the requested trip dates and match the destination
- Do not invent Ticketmaster results or claim events are available unless they appear in the supplied results
- If no relevant Ticketmaster events are supplied, do not imply that any were found
 """},
            {
                "role": "user", 
                "content": f"""
                Please create a clear optimal {trip.days} day trip plan to {trip.destination} with a budget of £{trip.budget} for {trip.number_of_travellers} traveller(s). 
                The trip pacing should be {trip.pace_preference}. The traveller interests include {trip.interests}. The traveller wants a holiday type of {trip.holiday_type}.
                Here are some results from ticketmaster which you can use to help make the plan (Do not feel obligated to use them if you feel it isn't necessary.). Ensure to reference that you got them from ticketmaster if used in the plan: {events}.
"""
            }
        ]
    )
    try:
        raw = json.loads(response.output_text)
        return TripResponse(**raw)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned invalid JSON")
    except response.status == "incomplete":
        raise HTTPException(status_code=502, detail="Itinerary was too long to generate, try fewer days")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something went wrong: {e}")