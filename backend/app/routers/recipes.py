import os
import requests
from fastapi import APIRouter, Depends
from dotenv import load_dotenv

from typing import Annotated
from sqlalchemy.orm import Session
from app.schemas import RequestRecipe, Response, UserSchema
from app import database
from app.database import get_db
from app.login import get_current_user


load_dotenv()

API_KEY = os.getenv('SPOONACULAR_API_KEY')
API_KEY_QUERY = f"apiKey={API_KEY}"
BASE_URL = 'https://api.spoonacular.com'


router = APIRouter(
    prefix="/recipes",
    tags=["recipes"]
)


@router.post("/add")
async def create(
        current_user: Annotated[UserSchema, Depends(get_current_user)],
        request: RequestRecipe,
        db: Annotated[Session, Depends(get_db)]
):
    user_id = current_user.username + current_user.hashed_password
    database.create_recipe(db, recipe=request.recipe, user_id=user_id)
    return Response(code=200, status="Ok", message="Recipe created successfully").dict(exclude_none=True)


@router.get("/")
async def get(db: Session = Depends(get_db)):
    _recipe = database.get_recipe(db, 0, 100)
    #return Response(code=200, status="Ok", message="Succeessful Fetch All data", result=_recipe)
    return {"message": "recipes"}


@router.get("/saved")
async def saved_recipes(
        current_user: Annotated[UserSchema, Depends(get_current_user)],
        db: Session = Depends(get_db)
):
    user_id = current_user.username + current_user.hashed_password
    recipes = database.get_recipes_by_user_id(db, user_id)
    recipes = [recipe for recipe in recipes if recipe is not None]
    return {"message": recipes}
