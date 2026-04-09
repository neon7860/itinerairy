from models.trip import TripResponse
import os
from openai import OpenAI

client = OpenAI()

def generate_itinerary(trip: TripResponse):

