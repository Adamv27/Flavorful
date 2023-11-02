from fastapi import FastAPI

from app import models
from app.config import engine
from app.routers import recipes
from app.routers import users
from app.exception_handlers import add_global_exception_handler


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(recipes.router)
app.include_router(users.router)

add_global_exception_handler(app)
