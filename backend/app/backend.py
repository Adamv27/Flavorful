import os
import requests
from dotenv import load_dotenv
from fastapi import FastAPI


load_dotenv()

API_KEY = os.getenv('SPOONACULAR_API_KEY')
API_KEY_QUERY = f"apiKey={API_KEY}"
BASE_URL = 'https://api.spoonacular.com'

app = FastAPI()


@app.get("/recipes")
async def root():
    url = f'{BASE_URL}/recipes/complexSearch?{API_KEY_QUERY}&cuisine=italian'
    response = requests.get(url)
    return response.json()
