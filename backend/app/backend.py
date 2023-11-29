from fastapi import FastAPI

from app import models
from app.config import engine
from app.routers import recipes
from app.routers import users
from app.exception_handlers import add_global_exception_handler
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recipes.router)
app.include_router(users.router)

add_global_exception_handler(app)
