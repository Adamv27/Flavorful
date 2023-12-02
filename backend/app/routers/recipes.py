import os
from fastapi import APIRouter, Depends
from dotenv import load_dotenv

from typing import Annotated
from sqlalchemy.orm import Session
from app.schemas import RequestRecipe, Response, UserSchema
from app import database
from app.database import get_db
from app.login import get_current_user
import logging

logger = logging.getLogger('uvicorn')

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
    recipe = database.get_recipe_by_id(db, user_id, request.recipe.id)
    if (recipe):
        logger.info(f"{recipe.title} is already in the database for user {current_user.username}")
        return Response(code=400, status="Ok", message="Recipe already exists!").dict(exclude_none=True)

    database.create_recipe(db, recipe=request.recipe, user_id=user_id)
    logger.info(f"Added {request.recipe.title} for user {current_user.username}")
    return Response(code=200, status="Ok", message="Recipe created successfully").dict(exclude_none=True)


@router.get("/saved")
async def saved_recipes(
        current_user: Annotated[UserSchema, Depends(get_current_user)],
        db: Session = Depends(get_db)
):
    user_id = current_user.username + current_user.hashed_password
    recipes = database.get_recipes_by_user_id(db, user_id)
    recipes = [{"id": recipe.id,
                "image": recipe.image_url,
                "title": recipe.title}
               for recipe in recipes if recipe is not None]
    return {"recipes": recipes}
