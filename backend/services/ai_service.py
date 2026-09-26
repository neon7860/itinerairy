from models.trip import TripRequest, TripResponse
import os
from openai import OpenAI
from dotenv import load_dotenv
import json
from fastapi import HTTPException

load_dotenv()

endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
deployment_name = os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME")
api_key = os.getenv("AZURE_OPENAI_API_KEY")

client = OpenAI(
    base_url=endpoint,
    api_key=api_key
)

def generate_itinerary(trip: TripRequest):
    response = client.responses.create(
        model=deployment_name,
        input=[
            {"role": "system", "content": """
You are an expert travel planner with deep knowledge of destinations worldwide. 
You create detailed, personalised day-by-day itineraries based on the traveller's 
preferences, budget, and interests.

You must respond ONLY with a valid JSON object. No introductory text, no explanation, 
no markdown code blocks. Just raw JSON.

The JSON must follow this exact structure:
{
    "destination": "string",
    "days": integer,
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
 """},
            {
                "role": "user", 
                "content": f"""
                Please create a clear optimal {trip.days} day trip plan to {trip.destination} with a budget of £{trip.budget} for {trip.number_of_travellers} traveller(s). 
                The trip pacing should be {trip.pace_preference}. The traveller interests include {trip.interests}
"""
            }
        ]
    )
    try:
        raw = json.loads(response.output_text)
        return TripResponse(**raw)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned invalid JSON")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something went wrong: {e}")