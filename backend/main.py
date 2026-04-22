from fastapi import FastAPI
from routers.itinerary import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
"http://127.0.0.1:8000",
"http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router, prefix="/api")

@app.get("/")
def root():
    return {"message": "ItinerAIry API is running"}
