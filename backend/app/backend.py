from fastapi import FastAPI

from app import models
from app.config import engine
from app.routers import recipes
from app.routers import users
from app.exception_handlers import integrity_error_handler, recipe_does_not_exist_handler
from sqlalchemy.exc import IntegrityError
from app.exceptions import RecipeDoesNotExistError

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(recipes.router)
app.include_router(users.router)

app.add_exception_handler(IntegrityError, integrity_error_handler)
app.add_exception_handler(RecipeDoesNotExistError, recipe_does_not_exist_handler)
