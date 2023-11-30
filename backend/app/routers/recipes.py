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



@router.post("/create")
async def create(request: RequestRecipe, db: Session = Depends(get_db)):
    database.create_recipe(db, recipe=request.recipe)
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
    return {"message": "saved"} 
