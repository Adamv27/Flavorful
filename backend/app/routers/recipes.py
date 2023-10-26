import os
import requests
from fastapi import APIRouter
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('SPOONACULAR_API_KEY')
API_KEY_QUERY = f"apiKey={API_KEY}"
BASE_URL = 'https://api.spoonacular.com'


router = APIRouter(
    prefix="/recipes",
    tags=["recipes"]
)


@router.get("/search")
def search_for_recipes():
    url = f'{BASE_URL}/recipes/complexSearch?{API_KEY_QUERY}&cuisine=italian'
    response = requests.get(url)
    return response.json()


@router.get("/saved")
def saved_recipes():
    return "SAVED"
