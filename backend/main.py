from fastapi import FastAPI
from routers.itinerary import router

app = FastAPI()

app.include_router(router, prefix="/api")

@app.get("/")
def root():
    return {"message": "ItinerAIry API is running"}
