from models.trip import TripResponse
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_itinerary(trip: TripResponse):
    completion = client.chat.completions.create(
        model="gpt-5.4-nano",
        messages=[
            {"role": "developer", "content": """
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
                "content": f"{trip}"
            }
        ]
    )
    return completion.choices[0].message.content