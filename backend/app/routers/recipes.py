import os
from fastapi import APIRouter, Depends
from dotenv import load_dotenv
import json
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
        return Response(code=409, status="Conflict", message=f"Recipe already exists for user {current_user.username}").dict(exclude_none=True)

    database.create_recipe(db, recipe=request.recipe, user_id=user_id)
    logger.info(f"Added {request.recipe.title} for user {current_user.username}")
    return Response(code=201, status="Ok", message="Recipe created successfully").dict(exclude_none=True)


@router.get("/remove/{recipe_id}")
async def remove_recipe(
            recipe_id: int,
            current_user: Annotated[UserSchema, Depends(get_current_user)],
            db: Annotated[Session, Depends(get_db)]
):
    user_id = current_user.username + current_user.hashed_password
    if database.remove_recipe(db, user_id, recipe_id):
        return Response(code=200, status="Ok", message="Removed: " + str(recipe_id)).dict(exclude_none=True)

    return Response(code=400, status="Conflict", message="Failed to remove recipe from databse")


@router.get("/saved")
async def saved_recipes(
        current_user: Annotated[UserSchema, Depends(get_current_user)],
        db: Session = Depends(get_db),
):
    user_id = current_user.username + current_user.hashed_password
    recipes = database.get_recipes_by_user_id(db, user_id)
    recipes = [{"id": recipe.id,
                "image": recipe.image_url,
                "title": recipe.title}
               for recipe in recipes if recipe is not None]
    return {"recipes": recipes}


@router.get("/search")
async def find_recipes():

    recipes = {"recipes": [
        {
            "id": 715768,
            "title": "Broccolini Quinoa Pilaf",
            "image": "https://spoonacular.com/recipeImages/715768-312x231.jpg",
            "imageType": "jpg"
        },
        {
            "id": 715537,
            "title": "What to make for dinner tonight?? Bruschetta Style Pork & Pasta",
            "image": "https://spoonacular.com/recipeImages/715537-312x231.jpg",
            "imageType": "jpg"
        }
    ]}
    return Response(code=200, status="Ok", message=json.dumps(recipes))
