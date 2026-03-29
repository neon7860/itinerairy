from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "ItinerAIry API is running"}