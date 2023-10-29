import os
import requests
from fastapi import APIRouter, Depends
from dotenv import load_dotenv

from sqlalchemy.orm import Session
from app.config import SessionLocal
from app.schemas import RequestRecipe, Response
from app import database

load_dotenv()

API_KEY = os.getenv('SPOONACULAR_API_KEY')
API_KEY_QUERY = f"apiKey={API_KEY}"
BASE_URL = 'https://api.spoonacular.com'


router = APIRouter(
    prefix="/recipes",
    tags=["recipes"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create")
async def create(request: RequestRecipe, db: Session = Depends(get_db)):
    database.create_recipe(db, recipe=request.parameter)
    return Response(code=200, status="Ok", message="Recipe created successfully").dict(exclude_none=True)


@router.get("/")
async def get(db: Session = Depends(get_db)):
    _recipe = database.get_recipe(db)
    return Response(code=200, status="Ok", message="Succeessful Fetch All data", result=_recipe)


@router.get("/{id}")
async def get_by_id(id: int, db: Session = Depends(get_db)):
    _recipe = database.get_recipe_by_id(db, id)
    return Response(code=200, status="Ok", message="Success get data", result=_recipe).dict(exclude_none=True)


@router.post("/update")
async def update_recipe(request: RequestRecipe, db: Session = Depends(get_db)):
    _recipe = database.update_recipe(db,
                                     recipe_id=request.parameter.id,
                                     title=request.parameter.title,
                                     image=request.parameter.image)
    return Response(code=200, status="Ok", message="Success update recipe", result=_recipe)


@router.delete("/{id}")
async def delete(id: int, db: Session = Depends(get_db)):
    database.remove_recipe(db, recipe_id=id)
    return Response(code=200, status="Ok", message="Success Delete recipe").dict(exclude_none=True)


@router.get("/search")
def search_for_recipes():
    url = f'{BASE_URL}/recipes/complexSearch?{API_KEY_QUERY}&cuisine=italian'
    response = requests.get(url)
    return response.json()


@router.get("/saved")
def saved_recipes():
    return "SAVED"
