# Python - FastAPI - USED FOR PRACTICE. NOT PART OF APP. 
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/destinations/{name}")
def return_destination_name(name: str):
    return {"name": name, "fact": f"{name} has the largest statue in the world."}

@app.get("/trips/search")
def return_desination_and_budget(destination: str, max_budget: int = 2000):
    if max_budget < 1000:
        return {"destination": destination, "Location": "affordable"}
    elif max_budget >= 1000 and max_budget <= 2000:
        return {"destination": destination, "Location": "moderate"}
    else:
        return {"destination": destination, "Location": "expensive"}
    
class TripPlan(BaseModel):
    destination: str
    days: int
    budget: float
    interests: list[str]

@app.post("/trips/plan")
def return_plan(plan: TripPlan):
    daily_budget = plan.budget / plan.days

    return {"destination": plan.destination, "days": plan.days, "budget": plan.budget, "daily_budget": daily_budget, "message": f"Planning your {plan.days} day trip to {plan.destination}", "interests": plan.interests}
